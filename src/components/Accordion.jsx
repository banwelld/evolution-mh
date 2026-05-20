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

export default function Accordion({ rawFrontmatter }) {
  const accordionData = parseFrontmatter(rawFrontmatter).metadata;
  return (
    <ContainerFrame modifier='accordion'>
      <h3 className='heading heading--accordion'>{accordionData.title}</h3>
      <div className='wrapper wrapper--accordion'>
        {accordionData.entries.map((entry) => {
          return (
            <details
              key={entry.summary}
              name='segment'
              className='accordion__segment'>
              <summary className='accordion__summary'>
                <span className='accordion__summary--icon'>{arrow}</span>
                <span className='accordion__summary--text'>
                  {entry.summary}
                </span>
              </summary>
              <p className='accordion__body text--paragraph'>{entry.details}</p>
            </details>
          );
        })}
      </div>
    </ContainerFrame>
  );
}
