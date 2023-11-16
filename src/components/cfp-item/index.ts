import { daysLeft, documentStyles, fontawesomeStyles, truncateWords } from '../../helpers';
import { formatDateRange } from '../../helpers/format-date-range';
import { Cfp } from '../../types';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'bootstrap';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';
// @ts-ignore
import noLogoImg from 'url:./assets/none.gif?width=90';

library.add(faGlobe);

@customElement('cfp-item')
export class CfpItem extends LitElement {
  @property({ type: Object })
  public data?: Cfp;

  @property({ type: Boolean })
  public visible = true;

  static get styles() {
    return [
      documentStyles(),
      fontawesomeStyles(),
      css`
        @media (max-width: 575px) {
          .media-left {
            display: block;
            margin-bottom: 0.5em;
          }

          .media-body {
            display: block;
            width: 100%;
          }
        }
        @media (min-width: 576px) {
          .media-left .media-object {
            max-width: 90px;
            max-height: 90px;
            object-fit: contain;
          }
        }
      `,
    ];
  }

  render() {
    //@ts-ignore
    dom.watch({
      autoReplaceSvgRoot: this.shadowRoot,
      observeMutationsRoot: this.shadowRoot,
    });

    if (!this.visible) {
      return html``;
    }

    return html`
      ${(this.data &&
        html`
          <li class="list-group-item mb-2">
            <div class="d-block d-sm-flex media-left">
              <div class="flex-shrink-0${(!this.data.iconUri && ' d-none d-sm-block') || ''}">
                <a href="${this.data.eventUri}">
                  ${(this.data.iconUri && html` <img alt="" src="${this.data.iconUri}" class="media-object" /> `) ||
                  html` <img alt="" src="${noLogoImg}" class="media-object" /> `}
                </a>
              </div>
              <div class="flex-grow-1 ms-sm-3 media-body">
                <h5 class="media-heading">
                  <a href="${this.data.uri}">${this.data.name}</a>
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-title="CfP runs ${formatDateRange(
                      new Date(this.data.dateCfpStart),
                      new Date(this.data.dateCfpEnd),
                    )}"
                    class="badge rounded-pill bg-secondary"
                    >${daysLeft(new Date(this.data.dateCfpEnd))} Days left</span
                  >
                  ${(this.data.latitude &&
                    this.data.longitude &&
                    html`
                      <a class="float-end" href="${this.osmLink()}">
                        <i class="fa fa-globe"></i>
                        <span class="visually-hidden">Show event location on OpenStreetMap</span>
                      </a>
                    `) ||
                  html``}
                </h5>
                <div>${truncateWords(this.data.description ?? '', 40)}</div>
                <div class="mb-2">
                  ${this.data.tags.map((tag) => html` <span class="badge bg-info me-1">${tag}</span> `)}
                  ${this.data.sources.map((source) => html` <span class="badge bg-primary me-1">${source}</span> `)}
                </div>
                <div>
                  ${formatDateRange(new Date(this.data.dateEventStart), new Date(this.data.dateEventEnd))}
                  ${(this.data.location && html` @ ${this.data.location} `) || html``}
                </div>
              </div>
            </div>
          </li>
        `) ||
      html``}
    `;
  }

  updated() {
    const tooltipTriggerList = this.renderRoot.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }

  private osmLink() {
    if (!this.data) {
      return '';
    }
    return `//www.openstreetmap.org?mlat=${this.data.latitude}&mlon=${this.data.longitude}#map=5/${this.data.latitude}/${this.data.longitude}`;
  }
}
