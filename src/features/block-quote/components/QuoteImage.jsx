import infoIcon from '../assets/icons/info-offwhite-lt.svg';

export default function QuoteImage({ image, description, InfoView }) {
  return (
    <div className='image__container'>
      <img className='image' src={image} alt={description} />
      <span className='image__info-icon'>
        <img src={infoIcon} alt='image tooltip icon' />
      </span>
      {InfoView}
    </div>
  );
}
