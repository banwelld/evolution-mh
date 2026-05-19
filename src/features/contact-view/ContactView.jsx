import { SectionFrame, ContainerFrame } from '../../components/Section';
import ContactForm from './components/ContactForm';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import crisisSupport from './content/crisis-support.md?raw';
import './ContactView.css';

const SECTION_TITLE = 'Get in Touch';
const DOMAIN = 'contact-view';

const INTRO_MESSAGE = `We look forward to connecting with you. Please reach out with 
any questions or to schedule a consultation.`;

export default function ContactView() {
  return (
    <SectionFrame modifier={DOMAIN} title={SECTION_TITLE}>
      <p className='content__paragraph'>{INTRO_MESSAGE}</p>
      <ContactForm />
      <ContainerFrame modifier='crisis-support'>
        <MarkdownDisplay markdownText={crisisSupport} />
      </ContainerFrame>
    </SectionFrame>
  );
}
