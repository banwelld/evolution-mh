import './Section.css';
import { forwardRef } from 'react';

export const SectionFrame = forwardRef(
  ({ modifier, title, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`section section__frame section__frame--${modifier}`}
        {...props}>
        {title && <h2 className='section-head'>{title}</h2>}
        {children}
      </section>
    );
  },
);

export const ArticleFrame = forwardRef(
  ({ modifier, title, children, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={`article article__frame article__frame--${modifier}`}
        {...props}>
        {title && <h2 className='section-head'>{title}</h2>}
        {children}
      </article>
    );
  },
);

export const ContainerFrame = forwardRef(
  ({ modifier, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`section__container section__container--${modifier}`}
        {...props}>
        {children}
      </div>
    );
  },
);
