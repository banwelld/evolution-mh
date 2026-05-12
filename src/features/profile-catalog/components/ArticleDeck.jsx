import ProfileView from '../ProfileView';
import Button from '../../../components/Button';

const CLOSE_LABEL = 'Close';
const ARIA_DECK_VIEW = 'Article Detail View';

export default function ArticleDeck({ activeProfile, onClose }) {
  if (!activeProfile) return null;

  const animatedLabel = (
    <span className='menu-button__content'>
      <svg
        className='menu-button__icon'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'>
        <line x1='18' y1='6' x2='6' y2='18'></line>
        <line x1='6' y1='6' x2='18' y2='18'></line>
      </svg>
      <span className='menu-button__text'>{CLOSE_LABEL}</span>
    </span>
  );

  return (
    <>
      <div className='article-deck__controls'>
        <Button
          label={animatedLabel}
          aria-label={CLOSE_LABEL}
          onClick={onClose}
          modifiers={['menu', 'dark']}
        />
      </div>
      <aside className='article-deck' aria-label={ARIA_DECK_VIEW}>
        <ProfileView data={activeProfile} domain={activeProfile.domain} />
      </aside>
    </>
  );
}
