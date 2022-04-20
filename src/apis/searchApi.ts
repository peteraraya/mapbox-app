import axios from 'axios';




const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    languaje: 'es',
    access_token:'pk.eyJ1IjoicGV0ZXJhcmF5YSIsImEiOiJjazZ3cjlyZnYwZnBmM2xxbncxbHJqcno1In0.JII9Hl_ga90TXOmLc9k8dw'
  }
});


export default searchApi;