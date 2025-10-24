export const closeMenu = () => {
  (document.activeElement as HTMLElement)?.blur();
};
