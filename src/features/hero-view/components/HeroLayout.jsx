import { SectionFrame, ContainerFrame } from '../../../components/Section';
import heroImage from '../assets/hero-image.webp';
import logo from '../assets/evolution-mhs-logo.webp';
import '../HeroView.css';

import { siteConfig } from '../../../config/siteConfig';

export default function HeroLayout({ stateItems, heroViewControls, config }) {
  const { heroImageRef, contentRef, isMobile, isComingSoon } = stateItems;

  const heroText = isComingSoon
    ? siteConfig.global.comingSoonText
    : config.callToAction;

  const callToAction = (
    <ContainerFrame modifier='call-to-action'>
      <h1
        className='call-to-action__wrapper'
        aria-label={config.callToAction.join(' ')}>
        {heroText.map((line, index) => (
          <span
            key={index}
            className={`call-to-action ${index % 2 === 0 ? 'call-to-action--sans' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
    </ContainerFrame>
  );

  return (
    <SectionFrame modifier='hero-view'>
      <ContainerFrame modifier='hero-image'>
        {isMobile && callToAction}
        <img
          src={heroImage}
          className='hero-view__image--background'
          ref={heroImageRef}
          alt={config.imageAltText}
        />
      </ContainerFrame>

      <ContainerFrame modifier='hero-content' ref={contentRef}>
        <ContainerFrame modifier='evolution-mhs-logo'>
          <img
            className='hero-view__logo'
            src={logo}
            alt={config.logoAltText}
          />
        </ContainerFrame>

        {!isMobile && callToAction}

        {!isComingSoon && (
          <ContainerFrame modifier='option-buttons'>
            {heroViewControls}
          </ContainerFrame>
        )}
      </ContainerFrame>
    </SectionFrame>
  );
}
