import { Collapse } from 'bootstrap';

Array.from(document.querySelectorAll('[data-bs-toggle="collapse"]')).forEach((node) => new Collapse(node));
