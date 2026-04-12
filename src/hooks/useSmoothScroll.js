import { useCallback } from 'react';

export function useSmoothScroll(delayMs = 0) {
  return useCallback(
    (e, targetSelector) => {
      if (e?.preventDefault) e.preventDefault();

      setTimeout(() => {
        if (targetSelector === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const destination = document.querySelector(targetSelector);
        if (destination) {
          destination.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, delayMs);
    },
    [delayMs],
  );
}
