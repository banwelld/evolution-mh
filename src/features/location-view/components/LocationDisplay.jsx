import Button from '../../../components/ui/Button';
import { UiLabel as label } from '../../../config/constants';
import Loc from '../config/locationInfo';

export default function LocationDisplay({ locationMap, onDirectionClick }) {
  return (
    <div className='content content--location location-info'>
      <div className='location-info__map-container'>{locationMap}</div>

      <div className='location-info__details'>
        <div className='location-info__group'>
          <h3 className='location-info__heading'>Our Address</h3>
          <p className='location-info__text'>
            {Loc.ADDRESS_LINE_1}
            <br />
            {Loc.ADDRESS_LINE_2}
          </p>
        </div>

        <div className='location-info__group'>
          <h3 className='location-info__heading'>Contact</h3>
          <p className='location-info__text'>
            <a href={`tel:${Loc.PHONE_TEL}`} className='location-info__link'>
              {Loc.PHONE}
            </a>
            <br />
            <a href={`mailto:${Loc.EMAIL}`} className='location-info__link'>
              {Loc.EMAIL}
            </a>
          </p>
        </div>

        <div className='location-info__directions'>
          <Button
            label={label.DIRECTIONS_BUTTON}
            modifiers={['brand2']}
            onClick={onDirectionClick}
          />
        </div>
      </div>
    </div>
  );
}
