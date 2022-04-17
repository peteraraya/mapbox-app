import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducers";
import { getUserLocation } from '../../helpers';

export interface PlacesState { 
  isLoading: boolean;
  userLocation?:[ number, number ];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
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

  }, [])
  


  return (
    <PlacesContext.Provider value={{
     ...state
    }}>
    {children}
    </PlacesContext.Provider>
  )
}



// El estado es la información que almacenamos en memoria
// Inicializamos aqui el estado
// tenemos que devolver un children en el provider