import { createContext } from 'react';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
}


export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);



// El conexto es lo que vamos a exponerle a los demas componentes