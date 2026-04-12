import { useState } from 'react';
import { Frame } from '../../components/ui/Section';
import { UiLabel as label, AriaLabel as aria } from '../../config/constants';
import Selector from '../../components/ui/Selector';
import ContentDisplay from '../../components/ui/ContentDisplay';

const rawContent = import.meta.glob('./content/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const teamImages = import.meta.glob('./assets/*.webp', {
  eager: true,
  import: 'default',
});

const teamData = {
  'evolution-team': label.HEADING_TEAM_VIEW,
  'williams-elaine': 'Dr. Elaine Williams',
  'nadalin-alex': 'Dr. Alex Nadalin',
};

const teamMembers = Object.entries(teamData).map(([key, heading]) => ({
  key,
  heading,
}));

export default function TeamView() {
  const [selectedContent, setSelectedContent] = useState('evolution-team');

  const markdownText = rawContent[`./content/${selectedContent}.md`];
  const teamViewImage = teamImages[`./assets/${selectedContent}.webp`];

  return (
    <Frame sectionName='team-view'>
      <h2 className='section-head'>{label.HEADING_TEAM_VIEW}</h2>

      <Selector
        items={teamMembers}
        selectedKey={selectedContent}
        onSelect={setSelectedContent}
        ariaLabel={aria.TEAM_SELECTOR}
      />

      {selectedContent === 'evolution-team' && (
        <div className='team-view__image-container'>
          <img
            className='team-view__image--background'
            src={teamViewImage}
            alt={label.BACKGROUND_TEAMVIEW}
          />
        </div>
      )}

      <article className='content content--single'>
        <Frame sectionName='details'>
          {selectedContent !== 'evolution-team' && (
            <div className='content__image-container'>
              <img
                className='content__image'
                src={teamViewImage}
                alt={label.BACKGROUND_TEAMVIEW}
              />
            </div>
          )}
          <ContentDisplay markdownText={markdownText} />
        </Frame>
      </article>
    </Frame>
  );
}
