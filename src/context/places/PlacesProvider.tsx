import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducers";
import { getUserLocation } from '../../helpers';
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState { 
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

interface Props {
  children: JSX.Element | JSX.Element[];
}



export const PlacesProvider = ({ children }: Props) => {
  

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    // si no tiene ninguna dependencia se hara la primera vez que sea montado
  
    //obtener geolocalización de la persona - como no podemos usar async le colocamos then
    getUserLocation()
      .then(lngLat => dispatch({ type: 'SET_USER_LOCATION', payload: lngLat }));

  }, []);


  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    
    if (query.length === 0) {
      //  Limpieza input cuando se borra lo que se escribe
      dispatch({ type: 'SET_PLACES', payload: [] });
      return [];
    }
    
    if (!state.userLocation) throw new Error('No hay ubicación del usuario');

    // Dispath
    dispatch({ type: 'SET_LOADING_PLACES' });

    const resp = await searchApi.get <PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    });
      
    // Cuando ya se retorna el resultado
    dispatch({ type: 'SET_PLACES', payload: resp.data.features });

    return resp.data.features;


  }
  


  return (
    <PlacesContext.Provider value={{
      ...state,
        
      // Methods
      searchPlacesByTerm
    }}>
    {children}
    </PlacesContext.Provider>
  )
}



// El estado es la información que almacenamos en memoria
// Inicializamos aqui el estado
// tenemos que devolver un children en el provider