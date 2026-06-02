import Button from '../../../components/Button';
import ArticleLayout from './ArticleLayout';

const ARIA_CATALOG_LIST = 'Options list';

export default function Catalog({ catalogData, onClick, buttonLabel, domain }) {
  return (
    <ul className='list list--catalog' aria-label={ARIA_CATALOG_LIST}>
      {catalogData.map((article) => (
        <li
          key={article.filename}
          className={`list-item card card--${domain ? domain : 'UNSPECIFIED_DOMAIN'}`}
        >
          {/* CSS uses domain to style the article-deck */}
          <ArticleLayout articleData={{ ...article, domain }}>
            <Button
              label={buttonLabel}
              modifiers={['card', 'light']}
              onClick={() => onClick(article.filename)}
            />
          </ArticleLayout>
        </li>
      ))}
    </ul>
  );
}
