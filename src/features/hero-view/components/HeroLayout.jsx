import '../HeroView.css';
import { useState, useEffect } from 'react';
import { SectionFrame, ContainerFrame } from '../../../components/Section';
import heroImage from '../assets/hero-image.webp';
import logo from '../assets/evolution-mhs-logo.webp';

const CALL_TO_ACTION = ['your', 'evolution', 'starts here'];
const HERO_IMAGE_ALT_TEXT =
  'A young woman, pictured from the shoulders up, looks directly ahead with confidence and resolve from the corner of a dim room, warmly lit from the left.';
const LOGO_ALT_TEXT = 'The Evolution Mental Health Services logo.';

export default function HeroLayout({ stateItems, heroViewControls }) {
  const { heroImageRef, contentRef, isMobile } = stateItems;

  const callToAction = (
    <ContainerFrame modifier='call-to-action'>
      <h1
        className='call-to-action__wrapper'
        aria-label={CALL_TO_ACTION.join(' ')}>
        {CALL_TO_ACTION.map((line, index) => (
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
          alt={HERO_IMAGE_ALT_TEXT}
        />
      </ContainerFrame>

      <ContainerFrame modifier='hero-content' ref={contentRef}>
        <ContainerFrame modifier='evolution-mhs-logo'>
          <img className='hero-view__logo' src={logo} alt={LOGO_ALT_TEXT} />
        </ContainerFrame>

        {!isMobile && callToAction}

        <ContainerFrame modifier='option-buttons'>
          {heroViewControls}
        </ContainerFrame>
      </ContainerFrame>
    </SectionFrame>
  );
}
