export default function ContentLayout({ content }) {
  const { image, imageDescription, title, subtitle, credentials } = content;

  return (
    <>
      {image && (
        <div className='container container--image'>
          <img className='image' src={image} alt={imageDescription} />
        </div>
      )}
      <h3 className='title title--page-view'>
        <div className='title__first-line'>
          {title}
          {credentials && (
            <span className='title__creds'>{'\u00A0'}{credentials}</span>
          )}
        </div>
        {subtitle && (
          <div className='title__second-line'>
            <span className='title__subtitle'>{subtitle}</span>
          </div>
        )}
      </h3>
    </>
  );
}
