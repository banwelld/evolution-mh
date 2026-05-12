import { SectionFrame } from '../../components/Section';
import LocationDisplay from './components/LocationDisplay';
import LocationMap from './components/LocationMap';
import Index from './config/locationIndex';

const SECTION_TITLE = 'our location';
const DOMAIN = 'location-view';

const handleDirections = () => {
  window.open(Index.DIRECTIONS_URL, '_blank', 'noopener,noreferrer');
};

export default function LocationView() {
  return (
    <SectionFrame modifier={DOMAIN} title={SECTION_TITLE}>
      <LocationDisplay
        locationMap={<LocationMap />}
        onDirectionClick={handleDirections}
      />
    </SectionFrame>
  );
}
