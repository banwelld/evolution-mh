import { lazy, Suspense } from 'react';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';
import HeroView from '../features/hero-view/HeroView';

const CatalogView = lazy(() => import('../features/article-view/CatalogView'));
const ContactView = lazy(() => import('../features/contact-view/ContactView'));
const LocationView = lazy(() => import('../features/location-view/LocationView'));
const SectionTransition = lazy(() => import('../features/section-transition/SectionTransition'));
const Accordion = lazy(() => import('../components/Accordion'));

const rawContent = import.meta.glob(
  '../features/content-management/content/data/quotes/quote-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

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

const viewMap = {
  hero: HeroView,
  team: CatalogView,
  service: CatalogView,
  contact: ContactView,
  location: LocationView,
};

export default function AppLayout({ onToggle, inert }) {
  return (
    <main inert={inert} className={'app-slider'}>
      {siteConfig.sections.map((section) => {
        const View = viewMap[section.type];
        if (!View) return null;

        const isHeroView = section.type === 'hero';

        const viewProps = {
          config: section.config,
          sectionType: section.type,
          domain: section.id,
          onToggle,
        };

        return (
          <div key={section.id} id={section.id} className={`view view--${section.type}`}>
            <Suspense fallback={<div className='view-loader'>Loading...</div>}>
              {section.quoteFile && !isHeroView && (
                <SectionTransition rawText={unpackMarkdown(rawContent, section.quoteFile)} />
              )}
              <View {...viewProps}>
                {section.faqFile && !isHeroView && (
                  <Accordion rawFrontmatter={unpackMarkdown(rawAccordion, section.faqFile)} />
                )}
              </View>
            </Suspense>
          </div>
        );
      })}
      <Footer config={siteConfig.global} />
    </main>
  );
}
