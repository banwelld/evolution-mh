import { isValidString } from '../utils/helpers';
import './Button.css';

/**
 * @typedef ButtonProps
 * @property {string} label - Text to display (if children are null).
 * @property {string} [type="button"] - HTML button type. **Defaults to "button"** - Pass "submit" explicitly for forms.
 * @property {boolean} [displayAsText=false] - If true, adds "text" modifier so that styling can be applied appropriately.
 * @property {Array<string>} [modifiers=["default"]] - a list of modifiers that might apply to a button, e.g., sidebar, danger, secondary, etc.
 * @property {Object} [props] - an object of key/value pairs for any other button property.
 */

/** @param {ButtonProps} props
 *
 * Generic Button component for consistent UI styling.
 *
 * **IMPORTANT**: Component defaults to type="button". Pass "submit" for forms.
 *
 * **IMPORTANT**: Component discards children. Pass label instead.
 *
 * **IMPORTANT**: Component discards className props and creates its own as "button button--[modifier]"
 */
export default function Button({
  label,
  type = 'button',
  displayAsText = false,
  modifiers = [],
  className, // omit from props
  children, // omit from props
  ...props
}) {
  const buttonProps = { type, ...props };

  // Filter out any empty strings or nulls from the modifiers array
  const activeModifiers = Array.isArray(modifiers)
    ? modifiers.filter(isValidString)
    : [];

  // handle forgotten or omitted modifiers and displayAsText
  const normalizedMods = displayAsText
    ? activeModifiers.length === 0
      ? ['text']
      : [...activeModifiers, 'text']
    : activeModifiers.length === 0
      ? ['default']
      : activeModifiers;

  // generate classNames
  const modClasses = normalizedMods.map((m) => `button--${m}`).join(' ');

  return (
    <button {...buttonProps} className={`button ${modClasses}`.trim()}>
      {label}
    </button>
  );
}
