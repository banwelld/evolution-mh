import PreviewCard from './PreviewCard';
import Button from '../../../components/Button';

const ARIA_CATALOG_LIST = 'Options list';

export default function CardCatalog({
  catalog,
  cardButtonLabel,
  onSelect,
  domain,
}) {
  return (
    <div className={'container--catalog'}>
      <ul className='list list--catalog' aria-label={ARIA_CATALOG_LIST}>
        {catalog.map((article) => (
          <li key={article.filename} className={'list-item list-item--catalog'}>
            <PreviewCard
              data={article}
              domain={domain}
              selector={
                <Button
                  label={cardButtonLabel}
                  modifiers={['card', 'light']}
                  onClick={() => onSelect(article.filename)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
