import { ContainerFrame } from '../../../components/Section';
import './LocationDisplay.css';

export default function LocationDisplay({ config, locationMap, locationControls }) {
  const formattedPhone = config.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <ContainerFrame modifier='location'>
      <ContainerFrame modifier='location-map'>{locationMap}</ContainerFrame>

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
        {locationControls}
      </ContainerFrame>
    </ContainerFrame>
  );
}
