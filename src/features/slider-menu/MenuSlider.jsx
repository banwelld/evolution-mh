import './MenuSlider.css';
import { useEffect } from 'react';
import NavMenu from './NavMenu';
import Button from '../../components/Button';
import navConfig from './config/navConfig';

const SHOW_MENU_LABEL = 'Show Menu';
const CLOSE_MENU_LABEL = 'Close Menu';

export default function MenuSlider({ menuOpen, setMenuOpen }) {
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const animatedLabel = (
    <span className='menu-button__content'>
      <svg
        className='menu-button__icon'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'>
        <line x1='0' y1='4' x2='24' y2='4'></line>
        <line x1='0' y1='12' x2='24' y2='12'></line>
        <line x1='0' y1='20' x2='24' y2='20'></line>
      </svg>
      <span className='menu-button__text'>{SHOW_MENU_LABEL}</span>
    </span>
  );

  return (
    <>
      <NavMenu
        navConfig={navConfig}
        menuOpen={menuOpen}
        onToggleClick={toggleMenu}
      />
      <div className='app-slider__trigger'>
        <Button
          label={animatedLabel}
          aria-label={menuOpen ? CLOSE_MENU_LABEL : SHOW_MENU_LABEL}
          onClick={toggleMenu}
          modifiers={['menu', 'dark', menuOpen ? 'hidden' : null]}
        />
      </div>
    </>
  );
}
