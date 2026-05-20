import { siteConfig } from '../config/siteConfig';
import HeroView from '../features/hero-view/HeroView';
import CatalogView from '../features/articles/CatalogView';
import SectionTransition from '../features/section-transition/SectionTransition';
import LocationView from '../features/location-view/LocationView';
import ContactView from '../features/contact-view/ContactView';
import Accordion from '../components/Accordion';

const rawContent = import.meta.glob(
  '../features/content-management/content/data/quote-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

const rawFaqs = import.meta.glob(
  '../features/content-management/content/data/faq-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

export default function AppLayout({ onSelectArticle, isComingSoon }) {
  const unpackRawText = (filename) =>
    rawContent[`../features/content-management/content/data/${filename}.md`];

  const unpackRawFaq = (filename) =>
    rawFaqs[`../features/content-management/content/data/${filename}.md`];

  const componentMap = {
    hero: HeroView,
    team: CatalogView,
    service: CatalogView,
    contact: ContactView,
    location: LocationView,
  };

  return (
    <>
      {siteConfig.sections.map((section) => {
        const Component = componentMap[section.type];
        if (!Component) return null;

        const isHeroSection = section.type === 'hero';
        if (isComingSoon && !isHeroSection) return null;

        const configProps = {
          config: section.config,
          sectionType: section.type,
          domain: section.id,
        };

        return (
          <div
            key={section.id}
            id={section.id}
            className={`view view--${section.type}`}>
            {section.quoteFile && !isHeroSection && (
              <SectionTransition rawText={unpackRawText(section.quoteFile)} />
            )}
            <Component
              configProps={configProps}
              isComingSoon={isComingSoon}
              onSelectArticle={onSelectArticle}>
              {section.faqFile && !isHeroSection && (
                <Accordion rawFrontmatter={unpackRawFaq(section.faqFile)} />
              )}
            </Component>
          </div>
        );
      })}
    </>
  );
}
