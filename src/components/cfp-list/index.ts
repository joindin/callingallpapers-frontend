import { documentStyles } from '../../helpers';
import { Cfp, CfpResponse } from '../../types';
import '../cfp-item';
import { Task } from '@lit/task';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { repeat } from 'lit/directives/repeat';

@customElement('cfp-list')
export class CfpList extends LitElement {
  @property({ type: String })
  public filter = '';

  @property({ type: String })
  public href = '';

  @state()
  private events: Cfp[] = [];

  private apiTask = new Task(
    this,
    ([href]) =>
      fetch(href, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json: CfpResponse) => {
          this.events = (json.cfps ?? [])
            .filter((cfp) => (cfp.name ?? '') !== '')
            .sort((b, a) => new Date(b.dateCfpEnd).getTime() - new Date(a.dateCfpEnd).getTime());
          return json;
        }),
    () => [this.href],
  );

  static get styles() {
    return [documentStyles(), css``];
  }

  render() {
    return html`
      ${this.filter &&
      html` <p class="alert alert-warning">Showing only events containing "<strong>${this.filter}</strong>"</p> `}
      ${this.apiTask.render({
        pending: () => html`Loading events ...`,
      })}
      ${(this.events.length > 0 &&
        html`
          <ul class="media-list list-group">
            ${repeat(
              this.events ?? [],
              (cfp) => cfp._rel.cfp_uri,
              (cfp) => html` <cfp-item .data=${cfp} .visible=${this.matchesFilter(cfp)} /> `,
            )}
          </ul>
        `) ||
      html``}
    `;
  }

  matchesFilter(cfp: Cfp) {
    if (this.filter.trim() === '') {
      return true;
    }

    const searchTerm = this.filter.toLowerCase();

    if ((cfp.name ?? '').toLowerCase().indexOf(searchTerm) >= 0) {
      return true;
    }
    if ((cfp.description ?? '').toLowerCase().indexOf(searchTerm) >= 0) {
      return true;
    }
    if (cfp.tags.some((tag) => tag.toLowerCase().indexOf(searchTerm) >= 0)) {
      return true;
    }

    return false;
  }
}
