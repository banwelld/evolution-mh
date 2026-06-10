import { useCallback, useEffect, useRef, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import ArticleView from '../features/article-view/ArticleView';
import parseCatalog from '../features/article-view/catalogData';
import SiteNav from '../features/site-nav/SiteNav';
import AppLayout from './AppLayout';
import SliderTrigger from './SliderTrigger';

const SliderState = Object.freeze({
  ARTICLE: 'article',
  IDLE: 'idle',
  MENU: 'menu',
});

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(SliderState.IDLE);
  const lastActiveElementRef = useRef(null);

  const matchTeam = useMatch('/team/:id');
  const matchService = useMatch('/service/:id');
  const navigate = useNavigate();

  const activeId = matchTeam?.params.id || matchService?.params.id;
  const activeType = matchTeam ? 'team' : matchService ? 'service' : null;

  // Resolve the article data
  let selectedArticle = null;
  if (activeId && activeType) {
    const { catalog } = parseCatalog(activeType);
    const match = catalog.find((item) => item.filename === activeId);
    if (match) {
      selectedArticle = { ...match, domain: `${activeType}-view` };
    }
  }

  if (activeId && activeType && !selectedArticle) {
    throw new Response('Not Found', {
      status: 404,
      statusText: `The requested ${activeType === 'team' ? 'team member profile' : 'service details'} "${activeId}" could not be found.`,
    });
  }

  const derivedState = selectedArticle
    ? SliderState.ARTICLE
    : activeOverlay === SliderState.MENU
      ? SliderState.MENU
      : SliderState.IDLE;

  const toggleSlider = useCallback(
    (payload = SliderState.IDLE) => {
      const isClosingArticle = !!selectedArticle;
      const isClosingMenu = activeOverlay === SliderState.MENU;

      if (payload === SliderState.IDLE) {
        if (isClosingArticle) {
          navigate('/');
        } else if (isClosingMenu) {
          setActiveOverlay(SliderState.IDLE);
        }
        return;
      }

      if (typeof payload === 'object' && payload !== null) {
        navigate(`/${payload.contentType}/${payload.filename}`);
        return;
      }

      if (payload === SliderState.MENU) {
        setActiveOverlay(SliderState.MENU);
        return;
      }
    },
    [activeOverlay, selectedArticle, navigate],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        toggleSlider(SliderState.IDLE);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSlider]);

  // Track and restore focus for accessibility (a11y)
  useEffect(() => {
    if (derivedState !== SliderState.IDLE) {
      if (!lastActiveElementRef.current && document.activeElement) {
        lastActiveElementRef.current = document.activeElement;
      }

      requestAnimationFrame(() => {
        const triggerBtn = document.querySelector('.app-slider__trigger button');
        if (triggerBtn) {
          triggerBtn.focus();
        }
      });
    } else {
      if (lastActiveElementRef.current) {
        const elementToFocus = lastActiveElementRef.current;
        lastActiveElementRef.current = null;

        requestAnimationFrame(() => {
          if (elementToFocus && typeof elementToFocus.focus === 'function') {
            elementToFocus.focus();
          }
        });
      }
    }
  }, [derivedState]);

  const toggleMap = {
    [SliderState.ARTICLE]: () => toggleSlider(SliderState.IDLE),
    [SliderState.IDLE]: () => toggleSlider(SliderState.MENU),
    [SliderState.MENU]: () => toggleSlider(SliderState.IDLE),
    closeSlider: () => toggleSlider(SliderState.IDLE),
  };

  const getActiveClass = (state) => (state !== SliderState.IDLE ? `${state}-is-active` : '');

  return (
    <div className={`app-root ${getActiveClass(derivedState)}`}>
      <SliderTrigger sliderState={derivedState} onClick={toggleMap[derivedState]} />
      <ArticleView selectedArticle={selectedArticle} inert={derivedState !== SliderState.ARTICLE} />
      <SiteNav onToggle={toggleMap.closeSlider} inert={derivedState === SliderState.ARTICLE} />
      <AppLayout
        onToggle={toggleSlider}
        menuOpen={derivedState === SliderState.MENU}
        inert={derivedState !== SliderState.IDLE}
      />
    </div>
  );
}
