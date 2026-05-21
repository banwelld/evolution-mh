import { SectionFrame, ContainerFrame } from '../../components/Section';
import Catalog from './components/Catalog';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import parseCatalog from './catalogData';

export default function CatalogView({
  configProps,
  onSelectArticle,
  children,
}) {
  const { sectionType, domain, config } = configProps;
  const { rawIntro, catalog } = parseCatalog(sectionType);

  const handleSelect = (filename) => {
    const match = catalog.find((item) => item.filename === filename);
    if (match) onSelectArticle({ ...match, domain });
  };

  return (
    <SectionFrame modifier={domain} title={config.sectionTitle}>
      {rawIntro && (
        <ContainerFrame modifier='intro'>
          <MarkdownDisplay markdownText={rawIntro} />
        </ContainerFrame>
      )}
      <Catalog
        catalogData={catalog}
        cardButtonLabel={config.cardButtonLabel}
        onSelect={handleSelect}
        domain={domain}
      />
      {children}
    </SectionFrame>
  );
}
