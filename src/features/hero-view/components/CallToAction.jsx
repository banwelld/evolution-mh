import { ContainerFrame } from '../../../components/Section';

const LINE_CLASSES = ['call-to-action call-to-action--sans', 'call-to-action'];

export default function CallToAction({ callToActionArr = [] }) {
  return (
    <ContainerFrame modifier='call-to-action'>
      <h1 className='call-to-action__wrapper' aria-label={callToActionArr.join(' ')}>
        {callToActionArr.map((line, index) => (
          <span key={index} className={LINE_CLASSES[index % 2]}>
            {line}
          </span>
        ))}
      </h1>
    </ContainerFrame>
  );
}
