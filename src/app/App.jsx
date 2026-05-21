import { useState, useEffect } from 'react';
import AppLayout from './AppLayout';
import SiteNav from '../features/site-nav/SiteNav';
import ArticleView from '../features/articles/ArticleView';
import SliderTrigger from './SliderTrigger';

const SliderState = Object.freeze({
  ARTICLE: 'article',
  IDLE: 'idle',
  MENU: 'menu',
});

const isValidState = (string) => Object.values(SliderState).includes(string);

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(SliderState.IDLE);
  const [isComingSoon, setIsComingSoon] = useState(true);

  const derivedState =
    typeof activeOverlay === 'object' ? SliderState.ARTICLE : activeOverlay;

  if (!isValidState(derivedState)) setActiveOverlay(SliderState.IDLE);

  const toggleSlider = (payload = SliderState.IDLE) => {
    if (
      activeOverlay !== SliderState.IDLE
      || !(isValidState(payload) || typeof payload === 'object')
    )
      return setActiveOverlay(SliderState.IDLE);

    return setActiveOverlay(payload);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Coming Soon Screen (Cmd + Opt + /)
      if (e.metaKey && e.altKey && e.code === 'Slash') {
        setIsComingSoon((prev) => !prev);
      }

      // Set overlay to 'idle' on escape click
      if (e.key === 'Escape') {
        setActiveOverlay(SliderState.IDLE);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`app-root ${[SliderState.MENU, SliderState.ARTICLE].includes(derivedState) && `${derivedState}-is-active`}`}>
      {!isComingSoon && (
        <SliderTrigger
          sliderState={derivedState}
          onClick={() => toggleSlider(SliderState.MENU)}
        />
      )}
      {!isComingSoon && (
        <ArticleView
          activeArticle={
            derivedState === SliderState.ARTICLE ? activeOverlay : null
          }
          inert={derivedState === SliderState.MENU}
        />
      )}
      {!isComingSoon && (
        <SiteNav
          onToggle={() => toggleSlider(SliderState.IDLE)}
          inert={derivedState === SliderState.ARTICLE}
        />
      )}
      <AppLayout
        isComingSoon={isComingSoon}
        onSelectArticle={toggleSlider}
        menuOpen={derivedState === SliderState.MENU}
        inert={derivedState !== SliderState.IDLE}
      />
    </div>
  );
}
