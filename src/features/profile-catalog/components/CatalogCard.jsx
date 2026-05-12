import ContentLayout from './ContentLayout';

export default function CatalogCard({ data, domain, selector }) {
  return (
    <article className={`card ${domain ? `card--${domain}` : ''}`.trim()}>
      <ContentLayout content={data} />
      {selector}
    </article>
  );
}
