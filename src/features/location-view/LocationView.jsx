import { lazy, Suspense } from 'react';
import Button from '../../components/Button';
import { SectionFrame } from '../../components/Section';
import LocationDisplay from './components/LocationDisplay';

const LocationMap = lazy(() => import('./components/LocationMap'));

export default function LocationView({ configProps, children }) {
  const { domain, config } = configProps;

  const onDirectionsClick = () => {
    window.open(config.directionsUrl, '_blank', 'noopener,noreferrer');
  };

  const displayElements = {
    locationMap: (
      <Suspense
        fallback={
          <div className='location-info__map-container location-info__map-loader'>
            Loading map...
          </div>
        }
      >
        <LocationMap config={config} />
      </Suspense>
    ),
    locationControls: (
      <div className='wrapper wrapper--directions-button'>
        <Button
          label={config.directionsButtonLabel}
          modifiers={['location', 'light']}
          onClick={onDirectionsClick}
        />
      </div>
    ),
  };

  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      <LocationDisplay config={config} {...displayElements} />
      {children}
    </SectionFrame>
  );
}
