import Button from '../../components/Button';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function NavMenu({ navConfig, menuOpen, onToggleClick }) {
  const handleScroll = useSmoothScroll(400);
  return (
    <nav
      className={`push-nav ${menuOpen ? 'push-nav--open' : ''}`}
      onClick={menuOpen ? onToggleClick : undefined}>
      <ul className='list list--nav-buttons'>
        {navConfig.map(({ label, modifier, selector }) => {
          return (
            <li className='list-item list-item--navigation' key={modifier}>
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
