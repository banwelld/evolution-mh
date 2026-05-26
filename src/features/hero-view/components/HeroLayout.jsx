import { ContainerFrame, SectionFrame } from '../../../components/Section';
import '../HeroView.css';
import CallToAction from './CallToAction';
import CompanyLogo from './CompanyLogo';
import HeroButtons from './HeroButtons';
import HeroImage from './HeroImage';

export default function HeroLayout({ heroViewState, onClick, heroImage, logo, config }) {
  const { heroImageRef, contentRef, isMobile, isComingSoon } = heroViewState;

  return (
    <SectionFrame modifier='hero-view'>
      <HeroImage
        image={heroImage}
        imageRef={heroImageRef}
        altText={config.imageAltText}
        callToAction={isMobile && <CallToAction heroText={config.callToAction} />}
      />
      <ContainerFrame modifier='hero-content' ref={contentRef}>
        <CompanyLogo logo={logo} config={config} />
        {!isMobile && <CallToAction heroText={config.callToAction} />}
        {!isComingSoon && <HeroButtons config={config} onClick={onClick} />}
      </ContainerFrame>
    </SectionFrame>
  );
}
