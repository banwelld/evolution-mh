import { siteConfig } from '../config/siteConfig';
import HeroView from '../features/hero-view/HeroView';
import CatalogView from '../features/articles/CatalogView';
import SectionTransition from '../features/section-transition/SectionTransition';
import LocationView from '../features/location-view/LocationView';
import ContactView from '../features/contact-view/ContactView';
import Accordion from '../components/Accordion';
import Footer from '../components/Footer';

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

const unpackMarkdown = (glob, filename) => {
  const cleanFilename = filename.endsWith('.md') ? filename : `${filename}.md`;
  return glob[`../features/content-management/content/data/${cleanFilename}`];
};

const componentMap = {
  hero: HeroView,
  team: CatalogView,
  service: CatalogView,
  contact: ContactView,
  location: LocationView,
};

export default function AppLayout({ onSelectArticle, isComingSoon, inert }) {
  return (
    <main inert={inert} className={'app-slider'}>
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
              <SectionTransition
                rawText={unpackMarkdown(rawContent, section.quoteFile)}
              />
            )}
            <Component
              configProps={configProps}
              isComingSoon={isComingSoon}
              onSelectArticle={onSelectArticle}>
              {section.faqFile && !isHeroSection && (
                <Accordion
                  rawFrontmatter={unpackMarkdown(rawFaqs, section.faqFile)}
                />
              )}
            </Component>
          </div>
        );
      })}
      {!isComingSoon && <Footer />}
    </main>
  );
}
