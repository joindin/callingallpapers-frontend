import { dom } from '@fortawesome/fontawesome-svg-core';
import { unsafeCSS } from 'lit';

export function fontawesomeStyles() {
  const cssRules = dom.css();
  const globalStyle = unsafeCSS([cssRules]);

  return [globalStyle];
}
