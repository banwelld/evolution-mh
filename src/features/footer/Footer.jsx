import { UiLabel as label } from '../../config/constants';
import designerLogo from './assets/dave-banwell-logo-sm.png';
import './Footer.css';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className='footer'>
      <div className='footer__content'>
        <div className='footer__copyright'>
          &copy; {currentYear} {label.EVOLUTION_MHS_FULL}
        </div>
        <div className='footer__designer'>
          <a
            href='https://www.davebanwell.com'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__link'>
            <img
              src={designerLogo}
              alt='Dave Banwell Logo'
              className='footer__designer-logo'
            />
            {label.SITE_ATTRIBUTION}
          </a>
        </div>
      </div>
    </footer>
  );
}
