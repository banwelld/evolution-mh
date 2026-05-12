import './SectionTransition.css';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import { parseFrontmatter, isValidString } from '../../utils/helpers';

const INVALID_DATA = '** ERROR: Quote text invalid or not found.';
const ARIA_DIVIDER = 'Section divider.';

export default function SectionTransition({ rawText }) {
  if (!isValidString(rawText)) return INVALID_DATA;

  const {
    metadata: { source },
    body,
  } = parseFrontmatter(rawText || '');

  return (
    <figure className='section-divider' aria-label={ARIA_DIVIDER}>
      <div className='wrapper wrapper--quote'>
        <blockquote className='quote'>
          <MarkdownDisplay markdownText={body} />
        </blockquote>
        {isValidString(source) && <figcaption>{source}</figcaption>}
      </div>
    </figure>
  );
}
