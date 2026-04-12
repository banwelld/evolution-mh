import ReactMarkdown from 'react-markdown';
import { Error } from '../../config/constants';

export default function ContentDisplay({ markdownText }) {
  if (!markdownText) return <p>{Error.OPTION_NOT_SELECTED}</p>;

  return (
    <ReactMarkdown
      components={{
        // Critical Hack: Using H6 as a dedicated 'Byline' slot
        // to preserve h1-h5 for standard document hierarchy.
        h6: ({ node, ...props }) => (
          <p className='content__byline' {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h3 className='content__heading' {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h4 className='content__subheading' {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h4 className='content__subheading' {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className='content__paragraph' {...props} />
        ),
        ul: ({ node, ...props }) => <ul className='content__list' {...props} />,
        li: ({ node, ...props }) => (
          <li className='content__list-item' {...props} />
        ),
      }}>
      {markdownText}
    </ReactMarkdown>
  );
}
