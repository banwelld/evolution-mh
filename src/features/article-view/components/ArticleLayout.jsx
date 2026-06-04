import { ArticleFrame } from '../../../components/Section';

export default function ArticleLayout({ articleData, isPageLayout = false, children }) {
  const { image, imageDescription, domain, title, subtitle, credentials } = articleData;

  const Heading = isPageLayout ? 'h1' : 'h3';

  return (
    <ArticleFrame modifier={domain}>
      <header className='wrapper wrapper--article-header'>
        <div className='wrapper wrapper--image'>
          <img className='image' src={image} alt={imageDescription} />
        </div>
        <Heading className='title'>
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
        </Heading>
      </header>
      {children}
    </ArticleFrame>
  );
}
