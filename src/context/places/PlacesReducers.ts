import { PlacesState } from "./PlacesProvider";

type PlaceAction = {
  type: 'setUserLocation',
  payload: [number, number]
};


export const placesReducer = (state: PlacesState, action: PlaceAction): PlacesState => {

  switch (action.type) {

    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
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