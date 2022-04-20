import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResult';

export const SearchBar = () => {


  const { searchPlacesByTerm } = useContext(PlacesContext)

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChangued = (event: ChangeEvent<HTMLInputElement>) => {

     // Si el debounce tiene algo lo borro
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Lo volvemos a definir
    debounceRef.current = setTimeout(() => {

      // buscar o a ejecutar consulta
      console.log( 'debounce value:', event.target.value );
      searchPlacesByTerm(event.target.value);
    }, 350);


  }


  return (
    <div className="search-container">
      
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={ onQueryChangued }
      />
      <SearchResults />
    </div>
  )
}
