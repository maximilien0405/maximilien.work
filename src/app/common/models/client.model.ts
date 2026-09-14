export interface ClientAttributes {
  start_date: string;
}

export interface ClientProjectStep {
  title: string;
  description: string;
  status: string;
  estimated_time: number;
}

export interface ClientProjectDocument {
  file: { data: { attributes: { url: string } } };
  name?: string;
  number?: string | number;
  status?: string;
}

export interface ClientProjectLink {
  name: string;
  url: string;
}

export interface ClientProjectAttributes {
  title: string;
  subtitle: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  progress: ClientProjectStep[];
  links: ClientProjectLink[];
  documents: ClientProjectDocument[];
  client: { data: { attributes: ClientAttributes } };
}

export interface ClientProjectEntry {
  id?: number;
  attributes: ClientProjectAttributes;
}

export interface ClientProjectsResponse {
  data: ClientProjectEntry[];
}

export interface LoginResponse {
  jwt: string;
}
