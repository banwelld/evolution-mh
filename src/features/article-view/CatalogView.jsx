import MarkdownDisplay from '../../components/MarkdownDisplay';
import { ContainerFrame, SectionFrame } from '../../components/Section';
import parseCatalog from './catalogData';
import Catalog from './components/Catalog';

export default function CatalogView({ sectionType, domain, config, children }) {
  const { rawIntro, catalog } = parseCatalog(sectionType);

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
          routePrefix={sectionType}
          buttonLabel={config.cardButtonLabel}
          domain={domain}
        />
      </ContainerFrame>
      {children}
    </SectionFrame>
  );
}
