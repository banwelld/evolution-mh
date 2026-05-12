export const rawContent = import.meta.glob(
  '../content-management/content/data/quote-*.md',
  {
    query: '?raw',
    eager: true,
    import: 'default',
  },
);
