import { PlacesContext } from "./PlacesContext";

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



export const PlacesProvider = ({ children } : Props) => {
  return (
    <PlacesContext.Provider value={{
      isLoading: true,
      userLocation: undefined
    }}>
    {children}
    </PlacesContext.Provider>
  )
}



// El estado es la información que almacenamos en memoria
// Inicializamos aqui el estado
// tenemos que devolver un children en el provider