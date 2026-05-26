import { lazy, Suspense } from 'react';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';
import HeroView from '../features/hero-view/HeroView';

const CatalogView = lazy(() => import('../features/article-view/CatalogView'));
const ContactView = lazy(() => import('../features/contact-view/ContactView'));
const LocationView = lazy(() => import('../features/location-view/LocationView'));
const SectionTransition = lazy(() => import('../features/section-transition/SectionTransition'));
const Accordion = lazy(() => import('../components/Accordion'));

const rawContent = import.meta.glob('../features/content-management/content/data/quotes/quote-*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const rawAccordion = import.meta.glob(
  '../features/content-management/content/data/accordions/accordion-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

const unpackMarkdown = (glob, filename) => {
  const cleanFilename = filename.endsWith('.md') ? filename : `${filename}.md`;
  let subfolder = '';
  if (cleanFilename.startsWith('quote-')) {
    subfolder = 'quotes/';
  } else if (cleanFilename.startsWith('accordion-')) {
    subfolder = 'accordions/';
  }
  return glob[`../features/content-management/content/data/${subfolder}${cleanFilename}`];
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
          <div key={section.id} id={section.id} className={`view view--${section.type}`}>
            <Suspense fallback={<div className="view-loader">Loading...</div>}>
              {section.quoteFile && !isHeroSection && (
                <SectionTransition rawText={unpackMarkdown(rawContent, section.quoteFile)} />
              )}
              <Component
                configProps={configProps}
                isComingSoon={isComingSoon}
                onSelectArticle={onSelectArticle}
              >
                {section.faqFile && !isHeroSection && (
                  <Accordion rawFrontmatter={unpackMarkdown(rawAccordion, section.faqFile)} />
                )}
              </Component>
            </Suspense>
          </div>
        );
      })}
      {!isComingSoon && <Footer config={siteConfig.global} />}
    </main>
  );
}
