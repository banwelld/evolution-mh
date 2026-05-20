import { useState, useEffect } from 'react';
import AppLayout from './AppLayout';
import MenuSlider from '../features/slider-menu/MenuSlider';
import Footer from '../components/Footer';
import ArticleDeck from '../features/articles/components/ArticleDeck';

export default function App() {
  const [articleView, setArticleView] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(true);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Coming Soon Screen (Cmd + Opt + /)
      if (e.metaKey && e.altKey && e.code === 'Slash') {
        setIsComingSoon((prev) => !prev);
      }

      if (e.key === 'Escape') {
        if (articleView) setArticleView(null);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, articleView]);

  return (
    <div className={`app-root ${articleView ? 'article-is-active' : ''}`}>
      {!isComingSoon && (
        <ArticleDeck
          activeArticle={articleView}
          onClose={() => setArticleView(null)}
          inert={menuOpen ? true : undefined}
        />
      )}
      {!isComingSoon && (
        <MenuSlider
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          inert={!!articleView}
        />
      )}
      <main
        inert={articleView || menuOpen ? true : undefined}
        className={`menu-slider ${menuOpen ? 'menu-slider--open' : ''}`}
        onClick={menuOpen ? toggleMenu : undefined}>
        {menuOpen && !isComingSoon && (
          <div className='menu-slider__click-guard' />
        )}
        <AppLayout
          onToggleClick={toggleMenu}
          menuOpen={menuOpen}
          onSelectArticle={setArticleView}
          isComingSoon={isComingSoon}
        />
        {!isComingSoon && <Footer inert={!!(articleView || menuOpen)} />}
      </main>
    </div>
  );
}
