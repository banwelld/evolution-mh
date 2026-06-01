import { lazy, Suspense } from 'react';
import Button from '../../components/Button';
import { ContainerFrame, SectionFrame } from '../../components/Section';
import './LocationView.css';

const LocationMap = lazy(() => import('./components/LocationMap'));

export default function LocationView({ domain, config, children }) {
  const onClick = () => {
    window.open(config.directionsUrl, '_blank', 'noopener,noreferrer');
  };

  const loadingFallback = (
    <div className='location-info__map-container location-info__map-loader'>Loading map...</div>
  );

  const formattedPhone = config.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      <ContainerFrame modifier='location'>
        <ContainerFrame modifier='location-map'>
          <Suspense fallback={loadingFallback}>
            <LocationMap config={config} />
          </Suspense>
        </ContainerFrame>

        <ContainerFrame modifier='location-details'>
          <div className='wrapper wrapper--location'>
            <h3 className='heading heading--location'>{config.addressHeading}</h3>
            <p className='location location__address'>{config.addressLine1}</p>
            <p className='location location__address'>{config.addressLine2}</p>
          </div>

          <div className='wrapper wrapper--location'>
            <h3 className='heading heading--location'>{config.contactHeading}</h3>
            <p className='location location__phone-number'>
              <a href={`tel:+1${config.phone}`} className='link link--phone-number'>
                {formattedPhone}
              </a>
            </p>
            <p className='location location__email'>
              <a href={`mailto:${config.email}`} className='link link--email'>
                {config.email}
              </a>
            </p>
          </div>

          <div className='wrapper wrapper--directions-button'>
            <Button
              label={config.directionsButtonLabel}
              modifiers={['location', 'light']}
              onClick={onClick}
            />
          </div>
        </ContainerFrame>
      </ContainerFrame>
      {children}
    </SectionFrame>
  );
}
