import fm from 'front-matter';

export const isValidString = (string) => typeof string === 'string' && string.trim().length > 0;

export const capitalize = (string) =>
  isValidString(string) ? string.charAt(0).toUpperCase() + string.slice(1) : '';

export const parseFrontmatter = (rawMd) => {
  const { attributes, body: text } = fm(rawMd);
  return {
    metadata: attributes,
    body: text.trim(),
  };
};

const parseRawContent = (rawContent, schema) =>
  Object.entries(rawContent)
    .map(([path, rawMarkdown]) => {
      const { metadata, body } = parseFrontmatter(rawMarkdown);
      return { path, metadata, body };
    })
    .filter(({ body }) => body.trim().length > 6)
    .map(({ path, metadata, body }) => {
      const filename = path.split('/').pop().replace('.md', '');
      const cleanData = schema.parse({
        ...metadata,
        body,
      });
      return { filename, ...cleanData };
    });

export const parseContentData = (rawContent, schema) => {
  const contentData = parseRawContent(rawContent, schema);
  const sortedData = [...contentData].sort((a, b) => a.sortOrder - b.sortOrder);

  return sortedData;
};
