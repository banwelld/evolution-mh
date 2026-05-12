import ReactMarkdown from 'react-markdown';
import { isValidString } from '../utils/helpers';

const FALLBACK_CONTENT = 'CONTENT_NOT_AVAILABLE';

export default function MarkdownDisplay({ markdownText }) {
  if (!markdownText || !isValidString(markdownText.trim()))
    return <p>{FALLBACK_CONTENT}</p>;

  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className='heading heading--1' {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className='heading heading--2' {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className='heading heading--3' {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className='heading heading--4' {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className='text text--italic' {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className='text text--bold' {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className='text text--paragraph' {...props} />
        ),
        ul: ({ node, ...props }) => <ul className='text--list' {...props} />,
        li: ({ node, ...props }) => (
          <li className='text--list-item' {...props} />
        ),
      }}>
      {markdownText}
    </ReactMarkdown>
  );
}
