import { createContext, useContext, useState, useMemo } from 'react';
import { themes } from '../config/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState('original');

  const themeVariables = useMemo(() => {
    const selected = (themes[activeTheme] || themes.original).colors;
    const isMorningEmbers = activeTheme === 'morning-embers';
    const isEarthHearth = activeTheme === 'earth-hearth';
    const isInnerGlow = activeTheme === 'inner-glow';

    const neutralMix = isMorningEmbers || isEarthHearth ? '50%' : '40%';
    const neutralLtMix = isMorningEmbers || isEarthHearth ? '30%' : '20%';
    const darkMix = isInnerGlow ? '65%' : '80%';

    return {
      '--color-brand1': `hsl(${selected.brand1})`,
      '--color-brand2': `hsl(${selected.brand2})`,
      '--color-contrast': `hsl(${selected.contrast})`,

      // Derived Dark Versions
      '--color-brand1-dk': `color-mix(in hsl, hsl(${selected.brand1}) ${darkMix}, black)`,
      '--color-brand2-dk': `color-mix(in hsl, hsl(${selected.brand2}) 85%, black)`,
      '--color-contrast-dk': `color-mix(in hsl, hsl(${selected.contrast}) 90%, black)`,

      // Extra Dark
      '--color-brand1-xdk': `color-mix(in hsl, hsl(${selected.brand1}) 40%, black)`,
      '--color-brand2-xdk': `color-mix(in hsl, hsl(${selected.brand2}) 40%, black)`,

      // Light Versions
      '--color-brand1-lt': `color-mix(in hsl, hsl(${selected.brand1}) 65%, white)`,
      '--color-brand2-lt': `color-mix(in hsl, hsl(${selected.brand2}) 65%, white)`,
      '--color-contrast-lt': `color-mix(in hsl, hsl(${selected.contrast}) 65%, white)`,

      // Font Specific
      '--color-nav-link': isMorningEmbers
        ? `var(--color-contrast)`
        : `hsl(${selected.brand2})`,
      '--color-nav-link-hover': `color-mix(in hsl, hsl(${selected.brand2}) 65%, white)`,

      // Neutrals (More saturated for Morning Embers)
      '--color-offwhite': `color-mix(in hsl, hsl(${selected.brand2}) ${neutralMix}, white)`,
      '--color-offwhite-lt': `color-mix(in hsl, hsl(${selected.brand2}) ${neutralLtMix}, white)`,

      // Transparents
      '--fill-header-bg': `color-mix(in hsl, color-mix(in hsl, hsl(${selected.brand2}) ${neutralLtMix}, white) 60%, transparent)`,
      '--fill-nav-link-bg': `color-mix(in hsl, color-mix(in hsl, hsl(${selected.brand2}) ${neutralLtMix}, white) 70%, transparent)`,

      // Shadows
      '--shadow-form-field': `
        inset 0 2px 6px color-mix(in srgb, color-mix(in hsl, hsl(${selected.brand1}) 40%, black) 25%, transparent),
        inset 0 1px 2px color-mix(in srgb, color-mix(in hsl, hsl(${selected.brand1}) 40%, black) 20%, transparent)`,
      '--shadow-form-field-focused': `
        inset 0 2px 6px color-mix(in srgb, color-mix(in hsl, hsl(${selected.brand1}) 40%, black) 25%, transparent),
        inset 0 1px 2px color-mix(in srgb, color-mix(in hsl, hsl(${selected.brand1}) 40%, black) 20%, transparent),
        0 0 0 3px color-mix(in srgb, hsl(${selected.brand1}) 25%, transparent)`,
    };
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme: setActiveTheme }}>
      <div className='theme-container' style={themeVariables}>
        {activeTheme === 'morning-embers' && (
          <style>{`
            .button--brand1, 
            .button--selector-active,
            .button--contact-form { 
               color: var(--color-offwhite) !important; 
            }
            .button--brand2 { 
               color: var(--color-contrast) !important; 
            }
            .quote { border-color: var(--color-brand1) !important; }
            .nav-link.push-nav__link { color: var(--color-brand2); }
          `}</style>
        )}
        {activeTheme === 'earth-hearth' && (
          <style>{`
            .hero-view__title, 
            .hero-view__intro { 
               color: var(--color-brand2) !important; 
            }
          `}</style>
        )}
        {activeTheme === 'inner-glow' && (
          <style>{`
            .button--brand1,
            .button--contact-form { 
               background: var(--color-brand1-dk) !important;
               color: var(--color-contrast);
            }
            .button--hero {
              color: var(--color-contrast)
            }
            .button--selector-active,
            .section-head,
            .content__heading,
            .content__subheading,
            .location-info__heading,
            .button--contact-form {
              color: var(--color-contrast)
            }
            .quote {
              background: var(--color-contrast);
            }
            .quote > .quote__text-container > .quote__text,
            .quote > .quote__text-container > .quote__citation {
              color: var(--color-brand1);
            }
          `}</style>
        )}
        {activeTheme === 'veridian-phoenix' && (
          <style>{`
            .quote {
              background: var(--color-contrast);
            }
            .button.button--selector {
              background: var(--color-brand2);
              color: var(--color-brand1-dk);
            }
            .button.button--selector-active,
            .button.button--contact-form,
            .button.button--brand1 {
              background: var(--color-brand1);
              color: var(--color-offwhite);
            }
            .section-head,
            {
              color: var(--color-contrast);
            }
          `}</style>
        )}
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
