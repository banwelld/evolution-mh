import { Frame, Container } from '../../../components/ui/Section';
import heroImage from '../assets/hero-image.jpg';
import logo from '../assets/evolution-mh-logo.png';
import { AriaLabel as Aria, UiLabel as Ui } from '../../../config/constants';

export default function HeroLayout({
  heroImageRef,
  contentRef,
  heroViewControls,
}) {
  return (
    <Frame sectionName='hero-view'>
      <img
        src={heroImage}
        className='hero-view__image--background'
        ref={heroImageRef}
        alt={Aria.HERO_IMAGE}
      />

      <div className='hero-view__content-wrapper' ref={contentRef}>
        <Container
          containerName='evolution-mh-logo'
          aria-label={Aria.EVOLUTION_LOGO}>
          <img className='hero-view__logo' src={logo} alt={Aria.HEADER_LOGO} />
        </Container>

        <Container
          containerName='call-to-action'
          aria-label={Aria.CALL_TO_ACTION}>
          <h2 className='call-to-action__wrapper'>
            <span className='call-to-action call-to-action--sans'>
              {Ui.CALL_TO_ACTION.LINE_1}
            </span>
            <span className='call-to-action'>{Ui.CALL_TO_ACTION.LINE_2}</span>
            <span className='call-to-action call-to-action--sans'>
              {Ui.CALL_TO_ACTION.LINE_3}
            </span>
          </h2>
        </Container>

        <Container containerName='option-buttons'>{heroViewControls}</Container>
      </div>
    </Frame>
  );
}
