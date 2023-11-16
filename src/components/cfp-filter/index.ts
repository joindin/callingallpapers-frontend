import { documentStyles } from '../../helpers';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement('cfp-filter')
export class CfpFilter extends LitElement {
  @property({ type: String })
  public value = '';

  static get styles() {
    return [documentStyles(), css``];
  }

  render() {
    return html`
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Filter"
          aria-label="Filter"
          value="${this.value}"
          @input="${this.handleFilterInput}"
        />
      </form>
    `;
  }

  private handleFilterInput(e: InputEvent): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.value = e.target.value;
    this.dispatchEvent(new Event('change'));
  }
}
