
import {  useContext, useEffect, useReducer } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './MapReducer';
import { PlacesContext } from '../';
import directionApi from '../../apis/directionApi';
import { DirectionResponse } from '../../interfaces/direction';

export interface MapState{
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}
const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

interface Props {
  children: JSX.Element | JSX.Element[];
}



export const MapProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // si no tiene ninguna dependencia se hara la primera vez que sea montado
    console.log('places', places);
    // borrar todos los marcadores que estan iscrutados en el mapa actual
    state.markers.forEach(marker => marker.remove());

    const newMarkers: Marker[] = [];
    
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
            <h6>${place.text}</h6>
            <p>${place.place_name}</p>
          `)
          
          const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([lng, lat])
        .addTo(state.map!);
      
      
      newMarkers.push(newMarker);
        
    }
    
    // TODO: limpiar polylines


    // nuevos marcadores
    dispatch({ type: 'SET_MARKERS', payload: newMarkers });
    
  }, [places])
  

  const setMap = (map: Map) => {

    // Popup
    const myLocationPopup = new Popup()
      .setHTML(`
        <h1>Aquí estoy</h1>
        <span>en algun lugar </span>
      `)


    // Nos creamos un marcador
    new Marker({
      color: '#2a9cbb',
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    

    dispatch({ type: 'SET_MAP', payload: map });
  }
  

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    
    const resp = await directionApi.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`);

    const { distance, duration, geometry } = resp.data.routes[0];

    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);
    
    console.log({ kms, minutes });
    console.log('resp ::>', resp);

    const bounds = new LngLatBounds(
      start,
      start
    );
   

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    
    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline - AnySourceData
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            }
          }
        ]
      }
    }



    // remover polyline si existe
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }


    // agregar polyline
    state.map?.addSource('RouteString', sourceData);


    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#00e2e2',
        'line-width': 3,
      }
    });



  }

  return (
    <MapContext.Provider value={{
      ...state,
      // setMap: setMap
      // Methods
      setMap,
      getRouteBetweenPoints
    }}>
      {children}
    </MapContext.Provider>
  )
}
