import ReactMarkdown from 'react-markdown';
import { isValidString } from '../utils/helpers';

const FALLBACK_CONTENT = 'CONTENT_NOT_AVAILABLE';

export default function MarkdownDisplay({ markdownText }) {
  if (!markdownText || !isValidString(markdownText.trim()))
    return <p>{FALLBACK_CONTENT}</p>;

  return (
    <ReactMarkdown
      urlTransform={(value) => {
        // Allow safe protocols (http, https, mailto, tel, sms) and relative paths/anchors
        if (value.match(/^(https?|mailto|tel|sms):/i) || value.startsWith('/') || value.startsWith('#')) {
          return value;
        }
        return '';
      }}
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
        a: ({ node, href, children, ...props }) => {
          const isExternal = href?.startsWith('http');
          return (
            <a
              href={href}
              className='text--link'
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              {...props}>
              {children}
            </a>
          );
        },
      }}>
      {markdownText}
    </ReactMarkdown>
  );
}
