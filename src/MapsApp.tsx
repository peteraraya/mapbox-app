import { PlacesProvider } from './context/places/PlacesProvider';
import { HomeScreen } from './screens';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  )
}
