import { SectionFrame, ContainerFrame } from '../../components/Section';
import ContactForm from './components/ContactForm';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import crisisSupport from './content/crisis-support.md?raw';
import './ContactView.css';

export default function ContactView({ configProps, children }) {
  const { domain, config } = configProps;
  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      <p className='text--paragraph'>{config.introMessage}</p>
      <ContactForm config={config} />
      <ContainerFrame modifier='crisis-support'>
        <MarkdownDisplay markdownText={crisisSupport} />
      </ContainerFrame>
      {children}
    </SectionFrame>
  );
}
