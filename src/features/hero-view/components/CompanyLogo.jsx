import { ContainerFrame } from '../../../components/Section';

export default function CompanyLogo({ logo, config }) {
  return (
    <ContainerFrame modifier='evolution-mhs-logo'>
      <img className='hero-view__logo' src={logo} alt={config.logoAltText} />
    </ContainerFrame>
  );
}
