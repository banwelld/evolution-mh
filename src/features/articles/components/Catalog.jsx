import ArticleLayout from './ArticleLayout';
import Button from '../../../components/Button';

const ARIA_CATALOG_LIST = 'Options list';

export default function Catalog({
  catalogData,
  cardButtonLabel,
  onSelect,
  domain,
}) {
  return (
    <div className={'container--catalog'}>
      <ul className='list list--catalog' aria-label={ARIA_CATALOG_LIST}>
        {catalogData.map((article) => (
          <li
            key={article.filename}
            className={`list-item card card--${domain ? domain : 'UNSPECIFIED_DOMAIN'}`}>
            <ArticleLayout articleData={article}>
              <Button
                label={cardButtonLabel}
                modifiers={['card', 'light']}
                onClick={() => onSelect(article.filename)}
              />
            </ArticleLayout>
          </li>
        ))}
      </ul>
    </div>
  );
}
