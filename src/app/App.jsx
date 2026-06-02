import { useCallback, useEffect, useState } from 'react';
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
  const [isComingSoon, setIsComingSoon] = useState(true);

  const matchTeam = useMatch('/team/:id');
  const matchService = useMatch('/service/:id');
  const navigate = useNavigate();

  const activeId = matchTeam?.params.id || matchService?.params.id;
  const activeType = matchTeam ? 'team' : (matchService ? 'service' : null);

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

  const derivedState = (selectedArticle && !isComingSoon)
    ? SliderState.ARTICLE
    : (activeOverlay === SliderState.MENU ? SliderState.MENU : SliderState.IDLE);

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
      // Toggle Coming Soon Screen (Cmd + Opt + /)
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.code === 'Slash') {
        setIsComingSoon((prev) => !prev);
      }

      if (e.key === 'Escape') {
        toggleSlider(SliderState.IDLE);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSlider]);

  const toggleMap = {
    [SliderState.ARTICLE]: () => toggleSlider(SliderState.IDLE),
    [SliderState.IDLE]: () => toggleSlider(SliderState.MENU),
    [SliderState.MENU]: () => toggleSlider(SliderState.IDLE),
  };

  return (
    <div
      className={`app-root ${
        [SliderState.MENU, SliderState.ARTICLE].includes(derivedState) &&
        `${derivedState}-is-active`
      }`}
    >
      {!isComingSoon && (
        <>
          <SliderTrigger sliderState={derivedState} onClick={toggleMap[derivedState]} />
          <ArticleView
            selectedArticle={selectedArticle}
            inert={derivedState !== SliderState.ARTICLE}
          />
          <SiteNav
            onToggle={() => toggleSlider(SliderState.IDLE)}
            inert={derivedState === SliderState.ARTICLE}
          />
        </>
      )}
      <AppLayout
        isComingSoon={isComingSoon}
        onToggle={toggleSlider}
        menuOpen={derivedState === SliderState.MENU}
        inert={derivedState !== SliderState.IDLE}
      />
    </div>
  );
}
