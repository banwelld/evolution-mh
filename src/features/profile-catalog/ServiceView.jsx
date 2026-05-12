import { SectionFrame, ContainerFrame } from '../../components/Section';
import ProfileCatalog from './components/ProfileCatalog';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import Accordion from '../../components/Accordion';
import { data } from './service-data/data';
import rawFaq from '../content-management/content/data/faq-services.md?raw';

const SECTION_TITLE = 'Our Services';
const CARD_BUTTON_LABEL = 'View Article';
const FAQ_TITLE = 'Commonly Asked Questions';

const { domain, rawIntro } = data;

export default function ServiceView({ onSelectProfile }) {
  const handleSelect = (filename) => {
    const match = data.profileData.find((item) => item.filename === filename);
    if (match) onSelectProfile({ ...match, domain });
  };

  return (
    <SectionFrame modifier={domain} title={SECTION_TITLE}>
      {rawIntro && <MarkdownDisplay markdownText={rawIntro} />}
      <ProfileCatalog
        data={data}
        buttonLabel={CARD_BUTTON_LABEL}
        onSelect={handleSelect}
      />
      <Accordion title={FAQ_TITLE} rawFrontmatter={rawFaq} />
    </SectionFrame>
  );
}
