import { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import HeroLayout from './components/HeroLayout';
import Button from '../../components/Button';

export default function HeroView({ configProps, isComingSoon }) {
  const { config } = configProps;

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
        label={config.btnContactLabel}
        onClick={(e) => handleScroll(e, '#contact-view')}
        aria-label={config.btnContactAria}
      />
      <Button
        modifiers={['dark', 'hero']}
        label={config.btnTeamLabel}
        onClick={(e) => handleScroll(e, '#team-view')}
        aria-label={config.btnTeamAria}
      />
    </>
  );

  const stateItems = {
    isMobile,
    heroImageRef,
    contentRef,
    isComingSoon,
  };

  return (
    <HeroLayout
      stateItems={stateItems}
      heroViewControls={heroViewControls}
      config={config}
    />
  );
}
