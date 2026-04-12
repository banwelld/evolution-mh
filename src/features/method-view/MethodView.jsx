import { useState } from 'react';
import { Frame } from '../../components/ui/Section';
import Selector from '../../components/ui/Selector';
import ContentDisplay from '../../components/ui/ContentDisplay';
import { UiLabel as label, AriaLabel as Aria } from '../../config/constants';

const Method = Object.freeze({
  THERAPY: 'therapy',
  CONSULTATIONS: 'consultations',
  ASSESSMENTS: 'assessments',
  GROUPS: 'groups',
});

// Programmatically generate the selector list from the enum
const methods = Object.values(Method).map((m) => ({ key: m }));

const rawContent = import.meta.glob('./content/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

export default function MethodView() {
  const [selectedContent, setSelectedContent] = useState(Method.THERAPY);

  const markdownText = rawContent[`./content/${selectedContent}.md`];

  return (
    <Frame sectionName='method-view'>
      <h2 className='section-head'>{label.HEADING_METHOD_VIEW}</h2>

      <Selector
        items={methods}
        selectedKey={selectedContent}
        onSelect={setSelectedContent}
        ariaLabel={Aria.METHOD_SELECTOR}
      />

      <article className='content content--single'>
        <Frame sectionName='details'>
          <ContentDisplay markdownText={markdownText} />
        </Frame>
      </article>
    </Frame>
  );
}
