import CatalogCard from './CatalogCard';
import Button from '../../../components/Button';

const ARIA_CATALOG_LIST = 'Options list';

export default function ProfileCatalog({ data, buttonLabel, onSelect }) {
  const { domain, profileData } = data;

  return (
    <div className={'container--catalog'}>
      <ul className='list list--catalog' aria-label={ARIA_CATALOG_LIST}>
        {profileData.map((item) => {
          const selector = (
            <Button
              displayAsText={true}
              label={buttonLabel}
              modifiers={['card', 'light']}
              onClick={() => onSelect(item.filename)}
            />
          );
          return (
            <li key={item.filename} className={'list-item list-item--catalog'}>
              <CatalogCard data={item} domain={domain} selector={selector} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
