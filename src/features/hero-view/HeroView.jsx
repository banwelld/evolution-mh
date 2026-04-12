import { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import HeroLayout from './components/HeroLayout';
import Button from '../../components/ui/Button';
import { AriaLabel as Aria, UiLabel as Ui } from '../../config/constants';

export default function HeroView() {
  const handleScroll = useSmoothScroll(0);
  const heroImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
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
          `${scrolled * 0.5}px`,
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroViewControls = (
    <>
      <Button
        modifiers={['brand1', 'hero']}
        label={Ui.START_YOUR_JOURNEY}
        onClick={(e) => handleScroll(e, '#contact')}
        aria-label={Aria.START_YOUR_JOURNEY}
      />
      <Button
        modifiers={['brand2', 'hero']}
        label={Ui.FIND_OUT_MORE}
        onClick={(e) => handleScroll(e, '#team')}
        aria-label={Aria.FIND_OUT_MORE}
      />
    </>
  );

  return (
    <HeroLayout
      heroImageRef={heroImageRef}
      contentRef={contentRef}
      heroViewControls={heroViewControls}
    />
  );
}
