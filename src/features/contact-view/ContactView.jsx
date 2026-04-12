import { Frame } from '../../components/ui/Section';
import { UiLabel as label, UiText as text } from '../../config/constants';
import ContactForm from './components/ContactForm';

export default function ContactView() {
  return (
    <Frame sectionName='contact-view'>
      <div className='content content--contact'>
        <h2 className='section-head'>{label.HEADING_CONTACT_VIEW}</h2>
        <p className='content__paragraph'>{text.CONTACT_VIEW_MESSAGE}</p>
        <ContactForm />
      </div>
    </Frame>
  );
}
