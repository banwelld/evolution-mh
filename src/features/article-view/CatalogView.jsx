import MarkdownDisplay from '../../components/MarkdownDisplay';
import { ContainerFrame, SectionFrame } from '../../components/Section';
import parseCatalog from './catalogData';
import Catalog from './components/Catalog';

export default function CatalogView({ sectionType, domain, config, onToggle, children }) {
  const { rawIntro, catalog } = parseCatalog(sectionType);

  const handleSelect = (filename) => {
    const match = catalog.find((item) => item.filename === filename);
    // CSS uses domain to style the cards
    if (match) onToggle({ ...match, domain });
  };

  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      {rawIntro && (
        <ContainerFrame modifier='intro'>
          <MarkdownDisplay markdownText={rawIntro} />
        </ContainerFrame>
      )}
      <ContainerFrame modifier={'catalog'}>
        <Catalog
          catalogData={catalog}
          onClick={handleSelect}
          buttonLabel={config.cardButtonLabel}
          domain={domain}
        />
      </ContainerFrame>
      {children}
    </SectionFrame>
  );
}
