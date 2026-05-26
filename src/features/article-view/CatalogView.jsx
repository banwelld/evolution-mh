import MarkdownDisplay from '../../components/MarkdownDisplay';
import { ContainerFrame, SectionFrame } from '../../components/Section';
import parseCatalog from './catalogData';
import Catalog from './components/Catalog';

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
      <ContainerFrame modifier={'catalog'}>
        <Catalog
          catalogData={catalog}
          cardButtonLabel={config.cardButtonLabel}
          onSelect={handleSelect}
          domain={domain}
        />
      </ContainerFrame>
      {children}
    </SectionFrame>
  );
}
