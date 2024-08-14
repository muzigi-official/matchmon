export const capitalizeFirstLetter = (string: string) => {
  if (/^[A-Za-z]/.test(string)) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};
