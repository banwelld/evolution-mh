import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import Button from '../../components/Button';
import { siteConfig } from '../../config/siteConfig';
import './SiteNav.css';

export default function SiteNav({ onToggle, inert }) {
  const handleScroll = useSmoothScroll(600);

  const dynamicNavConfig = siteConfig.sections.map((section) => ({
    label: section.menuLabel,
    modifier: section.type,
    selector: section.type === 'hero' ? 'top' : `.view--${section.type}`,
  }));

  return (
    <nav inert={inert} className={'site-nav'} onClick={onToggle}>
      <ul className='list'>
        {dynamicNavConfig.map(({ label, modifier, selector }) => {
          return (
            <li className='list-item' key={modifier}>
              <Button
                label={label}
                modifiers={['navigation', `${modifier}`]}
                aria-label={label}
                onClick={(e) => handleScroll(e, selector)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
