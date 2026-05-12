import { parseContentData } from '../../../utils/helpers';
import { ServiceSchema } from '../../content-management/config/serviceSchema';

const CONTENT_PATH = '../../content-management/content';
const INTRO_KEY = `${CONTENT_PATH}/data/service-intro.md`;

const rawContent = import.meta.glob(
  '../../content-management/content/data/service-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);

const images = import.meta.glob(
  '../../content-management/content/images/service-*.webp',
  {
    eager: true,
    import: 'default',
  },
);

const hasIntro = !!rawContent[INTRO_KEY];
const rawIntroMarkdown = hasIntro ? rawContent[INTRO_KEY] : null;
if (hasIntro) delete rawContent[INTRO_KEY];

const contentData = parseContentData(rawContent, ServiceSchema);

export const data = {
  domain: 'service-view',
  rawIntro: rawIntroMarkdown,
  profileData: contentData.map((item) => ({
    ...item,
    image: images[`${CONTENT_PATH}/images/${item.filename}.webp`] || null,
  })),
};
