import Button from '../../../components/Button';
import { ContainerFrame } from '../../../components/Section';

export default function HeroButtons({ config, onClick }) {
  return (
    <ContainerFrame modifier='option-buttons'>
      <Button
        modifiers={['medium', 'hero']}
        label={config.btnContactLabel}
        onClick={(e) => onClick(e, '#contact-view')}
        aria-label={config.btnContactAria}
      />
      <Button
        modifiers={['dark', 'hero']}
        label={config.btnTeamLabel}
        onClick={(e) => onClick(e, '#team-view')}
        aria-label={config.btnTeamAria}
      />
    </ContainerFrame>
  );
}
