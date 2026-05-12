import { parseContentData } from '../../../utils/helpers';
import { TeamSchema } from '../../content-management/config/teamSchema';

const CONTENT_PATH = '../../content-management/content';
const INTRO_KEY = `${CONTENT_PATH}/data/team-intro.md`;

const rawContent = import.meta.glob(
  '../../content-management/content/data/team-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

const images = import.meta.glob(
  '../../content-management/content/images/team-*.webp',
  {
    eager: true,
    import: 'default',
  },
);

const hasIntro = !!rawContent[INTRO_KEY];
const rawIntroMarkdown = hasIntro ? rawContent[INTRO_KEY] : null;
if (hasIntro) delete rawContent[INTRO_KEY];

const contentData = parseContentData(rawContent, TeamSchema);

export const data = {
  domain: 'team-view',
  rawIntro: rawIntroMarkdown,
  profileData: contentData.map((item) => ({
    ...item,
    image: images[`${CONTENT_PATH}/images/${item.filename}.webp`] || null,
  })),
};
