import Accordion from '../../components/Accordion';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import { ContainerFrame, SectionFrame } from '../../components/Section';
import crisisSupportRaw from '../content-management/content/data/accordion-contact.md?raw';
import contactIntro from '../content-management/content/data/intro-contact.md?raw';
import ContactForm from './components/ContactForm';
import './ContactView.css';

export default function ContactView({ configProps, children }) {
  const { domain, config } = configProps;
  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      <ContainerFrame modifier='intro'>
        <MarkdownDisplay markdownText={contactIntro} />
      </ContainerFrame>
      <Accordion rawFrontmatter={crisisSupportRaw} />
      <ContactForm config={config} />
      {children}
    </SectionFrame>
  );
}
