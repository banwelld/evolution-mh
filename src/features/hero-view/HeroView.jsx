import { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import HeroLayout from './components/HeroLayout';
import Button from '../../components/Button';

const BTN_CONTACT_LABEL = 'start your journey';
const BTN_CONTACT_ARIA = 'contact us to start your journey';
const BTN_TEAM_LABEL = 'find out more';
const BTN_TEAM_ARIA = 'advance to the next section to find out more about us';

export default function HeroView({ isComingSoon }) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 640px)').matches,
  );
  const handleScroll = useSmoothScroll(0);
  const heroImageRef = useRef(null);
  const contentRef = useRef(null);

  // listen for screen width for conditional call-to-action rendering
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    setIsMobile(media.matches);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (heroImageRef.current) {
        heroImageRef.current.style.setProperty('--parallax-offset', '0px');
      }
      if (contentRef.current) {
        contentRef.current.style.setProperty('--parallax-offset', '0px');
      }
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (heroImageRef.current) {
        heroImageRef.current.style.setProperty(
          '--parallax-offset',
          `${scrolled * 0.53}px`,
        );
      }

      if (contentRef.current) {
        contentRef.current.style.setProperty(
          '--parallax-offset',
          `${scrolled * 0.398}px`,
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const heroViewControls = (
    <>
      <Button
        modifiers={['medium', 'hero']}
        label={BTN_CONTACT_LABEL}
        onClick={(e) => handleScroll(e, '#contact')}
        aria-label={BTN_CONTACT_ARIA}
      />
      <Button
        modifiers={['dark', 'hero']}
        label={BTN_TEAM_LABEL}
        onClick={(e) => handleScroll(e, '#team')}
        aria-label={BTN_TEAM_ARIA}
      />
    </>
  );

  const stateItems = {
    isMobile,
    heroImageRef,
    contentRef,
  };

  return (
    <HeroLayout
      stateItems={stateItems}
      heroViewControls={heroViewControls}
      isComingSoon={isComingSoon}
    />
  );
}
