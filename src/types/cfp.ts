export type Cfp = {
  _rel: {
    cfp_uri: string;
  };
  dateCfpEnd: string;
  dateCfpStart: string;
  dateEventEnd: string;
  dateEventStart: string;
  description?: string;
  eventUri: string;
  iconUri: string;
  lastChange: string;
  name?: string;
  uri: string;
  latitude: number;
  longitude: number;
  tags: string[];
  sources: string[];
  location: string;
};
