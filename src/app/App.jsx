import { useEffect, useState } from 'react';
import ArticleView from '../features/article-view/ArticleView';
import SiteNav from '../features/site-nav/SiteNav';
import AppLayout from './AppLayout';
import SliderTrigger from './SliderTrigger';

const SliderState = Object.freeze({
  ARTICLE: 'article',
  IDLE: 'idle',
  MENU: 'menu',
});

const isValidState = (string) => Object.values(SliderState).includes(string);

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(SliderState.IDLE);
  const [activeArticle, setActiveArticle] = useState(null);
  const [isComingSoon, setIsComingSoon] = useState(true);

  const derivedState = typeof activeOverlay === 'object' ? SliderState.ARTICLE : activeOverlay;

  if (!isValidState(derivedState)) setActiveOverlay(SliderState.IDLE);

  if (derivedState === SliderState.ARTICLE && activeOverlay !== activeArticle) {
    setActiveArticle(activeOverlay);
  }

  const handleSliderTransitionEnd = (e) => {
    if (e.target.classList.contains('app-slider') && activeOverlay === SliderState.IDLE)
      setActiveArticle(null);
  };

  const toggleSlider = (payload = SliderState.IDLE) => {
    const isClosing = activeOverlay !== SliderState.IDLE;
    const isValidPayload =
      isValidState(payload) || (typeof payload === 'object' && payload !== null);

    if (isClosing || !isValidPayload) return setActiveOverlay(SliderState.IDLE);
    return setActiveOverlay(payload);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Coming Soon Screen (Cmd + Opt + /)
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.code === 'Slash') {
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
      className={`app-root ${
        [SliderState.MENU, SliderState.ARTICLE].includes(derivedState) &&
        `${derivedState}-is-active`
      }`}
    >
      {!isComingSoon && (
        <>
          <SliderTrigger
            sliderState={derivedState}
            onClick={() => toggleSlider(SliderState.MENU)}
          />
          {activeArticle && <ArticleView selectedArticle={activeArticle} />}
          <SiteNav
            onToggle={() => toggleSlider(SliderState.IDLE)}
            inert={derivedState === SliderState.ARTICLE}
          />
        </>
      )}
      <div onTransitionEnd={handleSliderTransitionEnd}>
        <AppLayout
          isComingSoon={isComingSoon}
          onToggle={toggleSlider}
          menuOpen={derivedState === SliderState.MENU}
          inert={derivedState !== SliderState.IDLE}
        />
      </div>
    </div>
  );
}
