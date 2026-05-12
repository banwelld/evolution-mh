import { ContainerFrame } from './Section';
import { parseFrontmatter } from '../utils/helpers';
import './Accordion.css';

const arrow = (
  <svg
    className='marker marker--chevron'
    xmlns='http://www.w3.org/2000/svg'
    height='16px'
    viewBox='0 -960 960 960'
    width='16px'>
    <path d='m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z' />
  </svg>
);

export default function Accordion({ title, rawFrontmatter }) {
  const faqData = parseFrontmatter(rawFrontmatter).metadata.questions;
  return (
    <ContainerFrame modifier='accordion'>
      <h3 className='heading heading--accordion'>{title}</h3>
      <div className='wrapper wrapper--accordion'>
        {faqData.map((item) => {
          return (
            <details key={item.q} name='segment' className='accordion__segment'>
              <summary className='accordion__summary'>
                <span className='accordion__summary--icon'>{arrow}</span>
                <span className='accordion__summary--text'>{item.q}</span>
              </summary>
              <p className='accordion__body text--paragraph'>{item.a}</p>
            </details>
          );
        })}
      </div>
    </ContainerFrame>
  );
}
