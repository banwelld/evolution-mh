import { SectionFrame, ContainerFrame } from '../../components/Section';
import ProfileCatalog from './components/ProfileCatalog';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import { data } from './team-data/data';

const SECTION_TITLE = 'The Evolution Team';
const CARD_BUTTON_LABEL = 'View Full Bio';

const { domain, rawIntro } = data;

export default function TeamView({ onSelectProfile }) {
  const handleSelect = (filename) => {
    const match = data.profileData.find((item) => item.filename === filename);
    if (match) onSelectProfile({ ...match, domain });
  };

  return (
    <SectionFrame modifier={domain} title={SECTION_TITLE}>
      {rawIntro && (
        <ContainerFrame modifier='intro'>
          <MarkdownDisplay markdownText={rawIntro} />
        </ContainerFrame>
      )}
      <ProfileCatalog
        data={data}
        buttonLabel={CARD_BUTTON_LABEL}
        onSelect={handleSelect}
      />
    </SectionFrame>
  );
}
