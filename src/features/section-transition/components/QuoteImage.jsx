import infoIcon from '../assets/icons/info-offwhite-lt.svg';

const INFO_ICON_ALT_TEXT = 'Hoverable information icon.';

export default function QuoteImage({ image, description, infoView }) {
  return (
    <div className='image__container'>
      <img className='image' src={image} alt={description} />
      <span className='image__info-icon'>
        <img src={infoIcon} alt={INFO_ICON_ALT_TEXT} />
      </span>
      {infoView}
    </div>
  );
}
