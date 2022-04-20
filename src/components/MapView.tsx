import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { PlacesContext, MapContext } from '../context';
import { Loading } from './Loading';


export const MapView = () => {

  const { isLoading, userLocation } = useContext(PlacesContext);

  // Mantendremos la referencia
  const mapDiv = useRef<HTMLDivElement>(null);

  // Enviamos al contexto el mapa

  const { setMap } = useContext(MapContext)


  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 12 // starting zoom
      });
      setMap(map);
    }
   
  }, [isLoading])

  // verificamos si esta cargando
  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor:'red',
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    >
      { userLocation?.join(',') }
    </div>
  )
}
