import { useState, useEffect } from 'react';
import HeroView from './features/hero-view/HeroView';
import NavMenu from './features/nav-menu/NavMenu';
import TeamView from './features/team-view/TeamView';
import BlockQuote from './features/block-quote/BlockQuote';
import MethodView from './features/method-view/MethodView';
import LocationView from './features/location-view/LocationView';
import ContactView from './features/contact-view/ContactView';
import navConfig from './features/nav-menu/config/navConfig';
import { UiLabel as Ui } from './config/constants';

import { ThemeProvider } from './features/palette-explorer/context/ThemeContext';
import ThemeSwitcher from './features/palette-explorer/components/ThemeSwitcher';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <ThemeProvider>
      <div className='app-root'>
        <NavMenu
          navConfig={navConfig}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
        />

        <div className='hero-view__menu-wrapper'>
          {!menuOpen && <ThemeSwitcher />}
          <button
            className={`button button--menu ${menuOpen ? 'button--menu--hide' : ''}`}
            onClick={toggleMenu}
            aria-label={Ui.SHOW_MENU}>
            {Ui.SHOW_MENU}
          </button>
        </div>

        <main
          className={`app-pusher ${menuOpen ? 'app-pusher--open' : ''}`}
          onClick={menuOpen ? toggleMenu : undefined}>
          {menuOpen && <div className='app-pusher__click-guard' />}

          <div id='main'>
            <HeroView />
          </div>

          <div id='team' className='grouping grouping--our-team'>
            <BlockQuote sourceKey='angelou-maya' />
            <TeamView />
          </div>

          <div id='methods' className='grouping grouping--methods'>
            <BlockQuote sourceKey='vaid-menon-alok' />
            <MethodView />
          </div>

          <div id='contact' className='grouping grouping--contact'>
            <BlockQuote sourceKey='osaka-naomi' />
            <ContactView />
          </div>

          <div id='location' className='grouping grouping--location'>
            <BlockQuote sourceKey='lair-jess' />
            <LocationView />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
