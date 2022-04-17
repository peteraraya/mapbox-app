import { useContext } from "react"
import { PlacesContext } from '../context';
import { Loading } from './Loading';

export const MapView = () => {

  const { isLoading, userLocation } = useContext(PlacesContext)

  // verificamos si esta cargando
  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div>
      { userLocation?.join(',') }
    </div>
  )
}
