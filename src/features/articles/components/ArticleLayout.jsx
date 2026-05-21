import { ArticleFrame } from '../../../components/Section';

export default function ArticleLayout({ articleData, children }) {
  const { domain, image, imageDescription, title, subtitle, credentials } =
    articleData;

  return (
    <ArticleFrame modifier={domain}>
      <header className='wrapper wrapper--article-header'>
        {image && (
          <div className='container container--image'>
            <img className='image' src={image} alt={imageDescription} />
          </div>
        )}
        <h3 className='title'>
          <div className='title__first-line'>
            {title}
            {credentials && (
              <span className='title__creds'>
                {'\u00A0'}
                {credentials}
              </span>
            )}
          </div>
          {subtitle && (
            <div className='title__second-line'>
              <span className='title__subtitle'>{subtitle}</span>
            </div>
          )}
        </h3>
      </header>
      {children}
    </ArticleFrame>
  );
}
