import Button from '../../../components/Button';
import { ContainerFrame, SectionFrame } from '../../../components/Section';
import '../HeroView.css';
import CallToAction from './CallToAction';

export default function HeroLayout({
  config,
  heroImage,
  logo,
  onClick,
  heroImageRef,
  contentRef,
  isMobile,
  isComingSoon,
}) {
  const { imageAltText, logoAltText, callToActionArr, buttonConfig = [] } = config;
  return (
    <SectionFrame modifier='hero-view'>
      <ContainerFrame modifier='hero-image'>
        {isMobile && <CallToAction callToActionArr={callToActionArr} />}
        <img src={heroImage} className='hero-image' ref={heroImageRef} alt={imageAltText} />
      </ContainerFrame>

      <ContainerFrame modifier='hero-content' ref={contentRef}>
        <ContainerFrame modifier='company-logo'>
          <img className='hero-view__logo' src={logo} alt={logoAltText} />
        </ContainerFrame>

        {!isMobile && <CallToAction callToActionArr={callToActionArr} />}

        {!isComingSoon && (
          <ContainerFrame modifier='option-buttons'>
            {buttonConfig.map((button) => (
              <Button
                key={button.label}
                modifiers={button.modifiers}
                label={button.label}
                onClick={(e) => onClick(e, button.clickParam)}
                aria-label={button.aria}
              />
            ))}
          </ContainerFrame>
        )}
      </ContainerFrame>
    </SectionFrame>
  );
}
