import { NavLink } from 'react-router-dom';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function NavMenu({ navConfig, menuOpen, toggleMenu }) {
  const handleScroll = useSmoothScroll(400);
  return (
    <nav
      className={`push-nav ${menuOpen ? 'push-nav--open' : ''}`}
      onClick={menuOpen ? toggleMenu : undefined}>
      <ul className='push-nav__list'>
        {navConfig.map(({ label, modifier }) => {
          return (
            <li className='push-nav__list-item' key={modifier}>
              <NavLink
                className={`nav-link push-nav__link nav-link--${modifier}`}
                to='#'
                aria-label={label}
                onClick={(e) => {
                  if (modifier === 'main') {
                    handleScroll(e, 'top');
                  } else if (modifier === 'team') {
                    handleScroll(e, '.grouping--our-team');
                  } else if (modifier === 'methods') {
                    handleScroll(e, '.grouping--methods');
                  } else if (modifier === 'contact') {
                    handleScroll(e, '.grouping--contact');
                  } else if (modifier === 'location') {
                    handleScroll(e, '.grouping--location');
                  }
                }}>
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
