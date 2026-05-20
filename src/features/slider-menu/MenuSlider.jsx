import './MenuSlider.css';
import { useEffect } from 'react';
import NavMenu from './NavMenu';
import Button from '../../components/Button';
import { siteConfig } from '../../config/siteConfig';

export default function MenuSlider({ menuOpen, setMenuOpen, inert }) {
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const dynamicNavConfig = siteConfig.sections.map((section) => ({
    label: section.menuLabel,
    modifier: section.type,
    selector: section.type === 'hero' ? 'top' : `.view--${section.type}`,
  }));

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
        {menuOpen ? (
          <>
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </>
        ) : (
          <>
            <line x1='0' y1='4' x2='24' y2='4'></line>
            <line x1='0' y1='12' x2='24' y2='12'></line>
            <line x1='0' y1='20' x2='24' y2='20'></line>
          </>
        )}
      </svg>
      <span className='menu-button__text'>
        {menuOpen
          ? siteConfig.global.ui.closeMenuLabel
          : siteConfig.global.ui.showMenuLabel}
      </span>
    </span>
  );

  return (
    <>
      <NavMenu
        navConfig={dynamicNavConfig}
        menuOpen={menuOpen}
        onToggleClick={toggleMenu}
        inert={inert ? true : undefined}
      />
      <div className='menu-slider__trigger' inert={inert ? true : undefined}>
        <Button
          label={animatedLabel}
          aria-label={
            menuOpen
              ? siteConfig.global.ui.closeMenuLabel
              : siteConfig.global.ui.showMenuLabel
          }
          onClick={toggleMenu}
          modifiers={['menu', 'dark']}
        />
      </div>
    </>
  );
}
