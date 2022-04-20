import axios from 'axios';




const directionApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps:false,
    access_token:'pk.eyJ1IjoicGV0ZXJhcmF5YSIsImEiOiJjazZ3cjlyZnYwZnBmM2xxbncxbHJqcno1In0.JII9Hl_ga90TXOmLc9k8dw'
  }
});


export default directionApi;