import Button from './Button';
import { capitalize } from '../../utils/helpers';

/**
 * @typedef SelectorItem
 * @property {string} key - Unique identifier for the item.
 * @property {string} [label] - Text to display (optional if labelField is specified).
 */

/**
 * @typedef SelectorProps
 * @property {Array<SelectorItem>} items - Array of items to display.
 * @property {string} selectedKey - The key of the currently selected item.
 * @property {Function} onSelect - Callback function (key) => void.
 * @property {string} [labelField="heading"] - The property name to use for the button label.
 * @property {string} [ariaLabel="Selection menu"] - Accessibility label for the navigation.
 * @property {Array<string>} [extraModifiers=[]] - Additional button modifiers.
 */

/** @param {SelectorProps} props */
export default function Selector({
  items,
  selectedKey,
  onSelect,
  labelField = 'heading',
  ariaLabel = 'Selection menu',
  extraModifiers = [],
}) {
  if (!items || !Array.isArray(items)) return null;

  return (
    <nav className='team-selector' aria-label={ariaLabel}>
      {items.map((item) => {
        // Fallback to capitalizing the key if the specific labelField is missing
        const buttonLabel = item[labelField] || capitalize(item.key);

        return (
          <Button
            key={item.key}
            label={buttonLabel}
            modifiers={[
              'selector',
              ...extraModifiers,
              selectedKey === item.key && 'selector-active',
            ]}
            onClick={() => onSelect(item.key)}
            aria-pressed={selectedKey === item.key}
          />
        );
      })}
    </nav>
  );
}
