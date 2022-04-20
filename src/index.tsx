import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

// Configuración de Mapbox
//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import './styles.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZXJhcmF5YSIsImEiOiJjazZ3cjlyZnYwZnBmM2xxbncxbHJqcno1In0.JII9Hl_ga90TXOmLc9k8dw';


// Validación de que si el navegador tienen geolocalización
if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error("Geolocation is not supported by your browser");
  
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
   <MapsApp />
  </React.StrictMode>
);

