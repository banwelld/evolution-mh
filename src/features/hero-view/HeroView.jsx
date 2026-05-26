import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import logo from './assets/evolution-mhs-logo.webp';
import heroImage from './assets/hero-image.webp';
import HeroLayout from './components/HeroLayout';

export default function HeroView({ configProps, isComingSoon }) {
  const { config } = configProps;

  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches);
  const onClick = useSmoothScroll(0);
  const heroImageRef = useRef(null);
  const contentRef = useRef(null);

  // listen for screen width for conditional call-to-action rendering
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const image = heroImageRef.current;
    const content = contentRef.current;

    // Stop early if refs aren't bound yet
    if (!image || !content) return;

    // Parallax is disabled on mobile devices
    if (isMobile) {
      image.style.setProperty('--parallax-offset', '0px');
      content.style.setProperty('--parallax-offset', '0px');
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      image.style.setProperty('--parallax-offset', `${scrolled * config.imageScrollSpeed}px`);
      content.style.setProperty('--parallax-offset', `${scrolled * config.contentScrollSpeed}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, config.imageScrollSpeed, config.contentScrollSpeed]);

  const heroViewState = {
    isMobile,
    heroImageRef,
    contentRef,
    isComingSoon,
  };

  return <HeroLayout {...{ heroViewState, onClick, heroImage, logo, config }} />;
}
