import { forwardRef } from 'react';

const sectionClass = (sectionName) =>
  `section section__frame section__frame--${sectionName}`;

const containerClass = (containerName) =>
  `section__container section__container--${containerName}`;

export const Frame = forwardRef(({ sectionName, children, ...props }, ref) => {
  return (
    <section ref={ref} className={sectionClass(sectionName)} {...props}>
      {children}
    </section>
  );
});

export const Container = forwardRef(
  ({ containerName, children, ...props }, ref) => {
    return (
      <div ref={ref} className={containerClass(containerName)} {...props}>
        {children}
      </div>
    );
  },
);
