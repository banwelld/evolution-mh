import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../config/themes';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme, setTheme } = useTheme();

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="theme-switcher">
      <button
        className="button button--menu theme-switcher__btn"
        onClick={toggle}
        aria-label="Toggle Palette Explorer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-switcher__menu">
          <div className="theme-switcher__header">Palette Explorer</div>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              className={`theme-switcher__option ${
                activeTheme === key ? 'theme-switcher__option--active' : ''
              }`}
              onClick={() => {
                setTheme(key);
                setIsOpen(false);
              }}
            >
              <div className="theme-switcher__swatch-group">
                <div
                  className="theme-switcher__swatch"
                  style={{ background: `hsl(${theme.colors.brand1})` }}
                />
                <div
                  className="theme-switcher__swatch"
                  style={{ background: `hsl(${theme.colors.brand2})` }}
                />
                <div
                  className="theme-switcher__swatch"
                  style={{ background: `hsl(${theme.colors.contrast})` }}
                />
              </div>
              <span className="theme-switcher__name">{theme.name}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .theme-switcher {
          position: relative;
          z-index: 2000;
          pointer-events: auto;
        }

        .theme-switcher__btn {
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
        }

        .theme-switcher__menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 1rem;
          background: var(--color-offwhite);
          border: 1px solid var(--color-brand1-lt);
          border-radius: 12px;
          padding: 1rem;
          width: 280px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          animation: slideDown 0.3s ease;
          pointer-events: auto;
        }

        .theme-switcher__header {
          font-family: var(--font-utility);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-brand1);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-brand1-lt);
          font-weight: 600;
        }

        .theme-switcher__option {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid transparent;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--color-contrast);
          text-align: left;
        }

        .theme-switcher__option:hover {
          background: var(--color-offwhite-lt);
          border-color: var(--color-brand1-lt);
        }

        .theme-switcher__option--active {
          background: color-mix(in hsl, var(--color-brand2) 15%, transparent);
          border-color: var(--color-brand2);
          font-weight: 600;
        }

        .theme-switcher__swatch-group {
          display: flex;
          gap: 2px;
          margin-right: 1rem;
          border: 1px solid var(--color-brand1-lt);
          padding: 2px;
          border-radius: 4px;
          background: var(--color-offwhite);
        }

        .theme-switcher__swatch {
          width: 14px;
          height: 14px;
          border-radius: 2px;
        }

        .theme-switcher__name {
          font-size: 0.85rem;
          font-family: var(--font-primary);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
