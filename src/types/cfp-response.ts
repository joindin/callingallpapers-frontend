import { Cfp } from './cfp';

export type CfpResponse = {
  cfps?: Cfp[];
  meta?: {
    count: number;
  };
};
