import { ContainerFrame } from '../../../components/Section';

export default function HeroImage({ callToAction, image, imageRef, altText }) {
  return (
    <ContainerFrame modifier='hero-image'>
      {callToAction}
      <img src={image} className='hero-view__image--background' ref={imageRef} alt={altText} />
    </ContainerFrame>
  );
}
