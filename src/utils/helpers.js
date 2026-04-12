export const isValidString = (string) =>
  typeof string === 'string' && string.trim().length > 0;

export const capitalize = (string) =>
  isValidString(string) ? string.charAt(0).toUpperCase() + string.slice(1) : '';
