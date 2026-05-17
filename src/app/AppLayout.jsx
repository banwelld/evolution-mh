import HeroView from '../features/hero-view/HeroView';
import TeamView from '../features/profile-catalog/TeamView';
import SectionTransition from '../features/section-transition/SectionTransition';
import ServiceView from '../features/profile-catalog/ServiceView';
import LocationView from '../features/location-view/LocationView';
import ContactView from '../features/contact-view/ContactView';

const rawContent = import.meta.glob(
  '../features/content-management/content/data/quote-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

export default function MainView({ onSelectProfile, isComingSoon }) {
  const unpackRawText = (filename) =>
    rawContent[`../features/content-management/content/data/${filename}.md`];

  return (
    <>
      <div id='hero' className='view view--hero'>
        <HeroView isComingSoon={isComingSoon} />
      </div>

      {!isComingSoon && (
        <>
          <div id='team' className='view view--team'>
            <SectionTransition rawText={unpackRawText('quote-evolution-1')} />
            <TeamView onSelectProfile={onSelectProfile} />
          </div>

          <div id='services' className='view view--services'>
            <SectionTransition rawText={unpackRawText('quote-evolution-2')} />
            <ServiceView onSelectProfile={onSelectProfile} />
          </div>

          <div id='contact' className='view view--contact'>
            <SectionTransition rawText={unpackRawText('quote-evolution-3')} />
            <ContactView />
          </div>

          <div id='location' className='view view--location'>
            <SectionTransition rawText={unpackRawText('quote-maya-angelou')} />
            <LocationView />
          </div>
        </>
      )}
    </>
  );
}
