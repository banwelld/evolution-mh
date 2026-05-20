import designerLogo from '../assets/dave-banwell-logo-sm.webp';
import './Footer.css';

const BRAND_FULL = 'Evolution Mental Health Services';
const SITE_ATTRIBUTION = 'Custom site build by Dave Banwell (2026)';

export default function Footer({ inert }) {
  const currentYear = 2026;

  return (
    <footer inert={inert ? true : undefined} className='footer'>
      <div className='footer__content'>
        <div className='footer__copyright'>
          &copy; {currentYear} {BRAND_FULL}
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
            {SITE_ATTRIBUTION}
          </a>
        </div>
      </div>
    </footer>
  );
}
