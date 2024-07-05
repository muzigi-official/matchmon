const size = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
};

export const mediaQuery = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktop: `@media only screen and (max-width: ${size.desktop})`,
  tabletUp: `@media only screen and (min-width: ${size.tablet})`,
  tabletDown: `@media only screen and (max-width: ${parseInt(size.tablet) - 1}px)`,
  mobileDown: `@media only screen and (max-width: ${parseInt(size.mobile) - 1}px)`,
};
