import { SectionFrame } from '../../components/Section';
import LocationDisplay from './components/LocationDisplay';
import LocationMap from './components/LocationMap';

export default function LocationView({ configProps, children }) {
  const { domain, config } = configProps;

  const handleDirections = () => {
    window.open(config.directionsUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      <LocationDisplay
        config={config}
        locationMap={<LocationMap config={config} />}
        onDirectionClick={handleDirections}
      />
      {children}
    </SectionFrame>
  );
}
