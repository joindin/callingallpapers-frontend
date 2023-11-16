import './boot/fontawesome';
import './components/cfp-filter';
import { CfpFilter } from './components/cfp-filter';
import './components/cfp-list';
import { CfpList } from './components/cfp-list';

(() => {
  const filterElem = document.getElementById('filter') as CfpFilter | null;
  const listElem = document.getElementById('list') as CfpList | null;

  if (filterElem && listElem) {
    filterElem.addEventListener('change', (ev: Event) => (listElem.filter = filterElem.value));
  }
})();
