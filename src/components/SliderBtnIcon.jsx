export default function SliderBtnIcon({ menuOpen }) {
  return (
    <svg
      className={`menu-button__icon ${menuOpen ? 'menu-button__icon--open' : ''}`}
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <line
        className='menu-line menu-line--top'
        x1='2'
        y1='4'
        x2='22'
        y2='4'
      ></line>
      <line
        className='menu-line menu-line--middle'
        x1='2'
        y1='12'
        x2='22'
        y2='12'
      ></line>
      <line
        className='menu-line menu-line--bottom'
        x1='2'
        y1='20'
        x2='22'
        y2='20'
      ></line>
    </svg>
  );
}
