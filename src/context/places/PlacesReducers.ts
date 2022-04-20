import { PlacesState } from "./PlacesProvider";
import { Feature } from '../../interfaces/places';

type PlaceAction =
  | { type: 'SET_USER_LOCATION', payload: [number, number] }
  | { type: 'SET_LOADING_PLACES' }
  | { type: 'SET_PLACES', payload: Feature[] }


export const placesReducer = (state: PlacesState, action: PlaceAction): PlacesState => {

  switch (action.type) {

    case 'SET_USER_LOCATION':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      };
    
    case 'SET_LOADING_PLACES':
      return {
        ...state,
        isLoadingPlaces: true,
        places: []
      };
    
    case 'SET_PLACES':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload
      };

    default:
      return state;
  }

}




/**
 * La función de un reducer no es más que una función pura
 * 
 * que recibe el estado y devuelve un objeto del mismo estado
 * 
 * También recibe las acciones que nos permite determinar el nuevo estado
 * 
 * El reducer siempre va devolver algo de tipo PlacesState
 * 
 */