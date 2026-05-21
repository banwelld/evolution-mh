import Button from '../components/Button';
import SliderBtnIcon from '../components/SliderBtnIcon';
import { siteConfig } from '../config/siteConfig';

const { closeMenuLabel, openMenuLabel, closeArticleLabel } =
  siteConfig.global.ui;

const ariaLabel = {
  idle: openMenuLabel,
  menu: closeMenuLabel,
  article: closeArticleLabel,
};

export default function SliderTrigger({ sliderState, onClick }) {
  return (
    <div className='app-slider__trigger app-slider__trigger--menu'>
      <Button
        label={<SliderBtnIcon menuOpen={sliderState !== 'idle'} />}
        aria-label={ariaLabel[sliderState]}
        onClick={onClick}
        modifiers={['slider-trigger', 'dark']}
      />
    </div>
  );
}
