import './LocationDisplay.css';
import { ContainerFrame } from '../../../components/Section';
import Button from '../../../components/Button';
import Index from '../config/locationIndex';

// ui labels
const ADDRESS_HEADING = 'Address';
const CONTACT_HEADING = 'Contact Information';
const DIRECTIONS_BUTTON_LABEL = 'Get Directions';

export default function LocationDisplay({ locationMap, onDirectionClick }) {
  const formattedPhone = Index.PHONE.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '($1) $2-$3',
  );

  return (
    <ContainerFrame modifier='location'>
      <ContainerFrame modifier='location-map'>{locationMap}</ContainerFrame>

      <ContainerFrame modifier='location-details'>
        <div className='wrapper wrapper--location'>
          <h3 className='heading heading--location'>{ADDRESS_HEADING}</h3>
          <p className='location location__address'>{Index.ADDRESS_LINE_1}</p>
          <p className='location location__address'>{Index.ADDRESS_LINE_2}</p>
        </div>

        <div className='wrapper wrapper--location'>
          <h3 className='heading heading--location'>{CONTACT_HEADING}</h3>
          <p className='location location__phone-number'>
            <a
              href={`tel:+1${Index.PHONE}`}
              className='link link--phone-number'>
              {formattedPhone}
            </a>
          </p>
          <p className='location location__email'>
            <a href={`mailto:${Index.EMAIL}`} className='link link--email'>
              {Index.EMAIL}
            </a>
          </p>
        </div>

        <div className='wrapper wrapper--directions-button'>
          <Button
            label={DIRECTIONS_BUTTON_LABEL}
            modifiers={['location', 'light']}
            onClick={onDirectionClick}
          />
        </div>
      </ContainerFrame>
    </ContainerFrame>
  );
}
