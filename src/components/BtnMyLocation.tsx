import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const BtnMyLocation = () => {

  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);


  const onClick = () => {
    
    // 1. Que el mapa este cargado
    if (!isMapReady) throw new Error('Mapa no esta cargado');

    // 2. Saber la posicion del usuario
    if (!userLocation) throw new Error('No hay ubicación del usuario');

    // 3. Centrar el mapa en la posicion del usuario
    map?.flyTo({
      center: userLocation,
      zoom: 14
    });

  }




  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99,
      }}   
    >
      Mi ubicación
    </button>
  )
}
