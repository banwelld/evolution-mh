import './Footer.css';

const assets = import.meta.glob('../assets/*.{webp,png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

export default function Footer({ inert, config }) {
  const { brandName, footer } = config;
  const { engineerUiCredit, engineerUrl, engineerLogoPath } = footer;

  const filename = engineerLogoPath?.split('/').pop();
  const logoSrc = assets[`../assets/${filename}`] || engineerLogoPath;

  return (
    <footer inert={inert ? true : undefined} className='footer'>
      <div className='footer__content'>
        <div className='footer__copyright'>
          &copy; {new Date().getFullYear()} {brandName}
        </div>
        <div className='footer__designer'>
          <a
            href={engineerUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='footer__link'
            aria-label={`${engineerUiCredit} (opens in a new tab)`}
          >
            <img src={logoSrc} alt='designer logo' className='footer__designer-logo' />
            {engineerUiCredit}
          </a>
        </div>
      </div>
    </footer>
  );
}
