import { MapProvider } from './context/map/MapProvider';
import { PlacesProvider } from './context/places/PlacesProvider';
import { HomeScreen } from './screens';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  )
}
