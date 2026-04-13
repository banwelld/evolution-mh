import { Frame } from '../../components/ui/Section';
import LocationDisplay from './components/LocationDisplay';
import LocationMap from './components/LocationMap';
import { UiLabel as label } from '../../config/constants';
import Loc from './config/locationInfo';

const handleDirections = () => {
  window.open(Loc.DIRECTIONS_URL, '_blank', 'noopener,noreferrer');
};

export default function LocationView() {
  return (
    <Frame sectionName='location-view'>
      <h2 className='section-head'>{label.HEADING_LOCATION_VIEW}</h2>
      <LocationDisplay
        locationMap={<LocationMap />}
        onDirectionClick={handleDirections}
      />
    </Frame>
  );
}
