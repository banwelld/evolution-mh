import { parseContentData } from '../../utils/helpers';
import comingSoonImage from '../../assets/coming-soon.webp';

const schemas = import.meta.glob('../content-management/config/*Schema.js', {
  eager: true,
  import: 'default',
});

const rawContent = {
  team: import.meta.glob('../content-management/content/data/team/article-*.md', {
    query: '?raw',
    eager: true,
    import: 'default',
  }),
  service: import.meta.glob('../content-management/content/data/services/article-*.md', {
    query: '?raw',
    eager: true,
    import: 'default',
  }),
};

const rawIntro = import.meta.glob('../content-management/content/data/intros/intro-*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const images = {
  team: import.meta.glob('../content-management/content/images/article-*.webp', {
    eager: true,
    import: 'default',
  }),
  service: import.meta.glob(
    '../content-management/content/images/article-*.webp',
    {
      eager: true,
      import: 'default',
    },
  ),
};

export default function parseCatalog(articleType) {
  const schemaPath = `../content-management/config/${articleType}Schema.js`;
  const dataToParse = { ...rawContent[articleType] };
  const introKey = `../content-management/content/data/intros/intro-${articleType}.md`;
  const rawIntroMarkdown = rawIntro[introKey] || null;

  const parsedContent = parseContentData(dataToParse, schemas[schemaPath]);

  return {
    rawIntro: rawIntroMarkdown,
    catalog: parsedContent.map((article) => {
      const imagePath = `../content-management/content/images/${article.image}`;
      return {
        ...article,
        image: images[articleType][imagePath] || comingSoonImage,
      };
    }),
  };
}
