import { useState, useEffect } from 'react';
import AppLayout from './AppLayout';
import MenuSlider from '../features/slider-menu/MenuSlider';
import Footer from '../components/Footer';
import ArticleDeck from '../features/profile-catalog/components/ArticleDeck';

export default function App() {
  const [profileView, setProfileView] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (profileView) setProfileView(null);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, profileView]);

  return (
    <div className={`app-root ${profileView ? 'profile-is-active' : ''}`}>
      <ArticleDeck
        activeProfile={profileView}
        onClose={() => setProfileView(null)}
      />
      <MenuSlider menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main
        className={`app-slider ${menuOpen ? 'app-slider--open' : ''}`}
        onClick={menuOpen ? toggleMenu : undefined}>
        {menuOpen && <div className='app-slider__click-guard' />}
        <AppLayout
          onToggleClick={toggleMenu}
          menuOpen={menuOpen}
          onSelectProfile={setProfileView}
        />
      </main>
      <Footer />
    </div>
  );
}
