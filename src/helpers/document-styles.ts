import { unsafeCSS } from 'lit';

export function documentStyles() {
  const { cssRules } = document.styleSheets[0];
  const globalStyle = unsafeCSS([
    Object.values(cssRules)
      .map((rule) => rule.cssText)
      .join('\n'),
  ]);

  return [globalStyle];
}
