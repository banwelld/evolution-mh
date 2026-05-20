import { parseContentData } from '../../utils/helpers';

const schemas = import.meta.glob('../content-management/config/*Schema.js', {
  eager: true,
  import: 'default',
});

const rawContent = {
  team: import.meta.glob('../content-management/content/data/team-*.md', {
    query: '?raw',
    eager: true,
    import: 'default',
  }),
  service: import.meta.glob('../content-management/content/data/service-*.md', {
    query: '?raw',
    eager: true,
    import: 'default',
  }),
};

const images = {
  team: import.meta.glob('../content-management/content/images/team-*.webp', {
    eager: true,
    import: 'default',
  }),
  service: import.meta.glob(
    '../content-management/content/images/service-*.webp',
    {
      eager: true,
      import: 'default',
    },
  ),
};

export default function parseCatalog(articleType) {
  const schemaPath = `../content-management/config/${articleType}Schema.js`;
  const dataToParse = { ...rawContent[articleType] };
  const introKey = `../content-management/content/data/${articleType}-intro.md`;

  const rawIntroMarkdown = dataToParse[introKey];
  if (rawIntroMarkdown) delete dataToParse[introKey];

  const parsedContent = parseContentData(dataToParse, schemas[schemaPath]);

  return {
    rawIntro: rawIntroMarkdown,
    catalog: parsedContent.map((article) => ({
      ...article,
      image:
        images[articleType][
          `../content-management/content/images/${article.filename}.webp`
        ] || null,
    })),
  };
}
