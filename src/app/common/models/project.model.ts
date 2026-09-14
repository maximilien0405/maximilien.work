export interface ProjectLink {
  name: string;
  url: string;
}

export interface ProjectTag {
  name: string;
}

export interface ProjectContent {
  number: number;
  title: string;
  url: string;
  description: string;
  noimage?: boolean;
  image?: { data: { attributes: { url: string } } };
}

export interface ProjectAttributes {
  title: string;
  subtitle: string;
  url: string;
  category: string;
  type: string;
  description?: string;
  onlyoneimage?: boolean;
  preview_image: { data: { attributes: { url: string } } };
  images: { data: { attributes: { url: string } }[] };
  links?: ProjectLink[];
  tags?: ProjectTag[];
  content: ProjectContent[];
}

export interface ProjectEntry {
  id?: number;
  attributes: ProjectAttributes;
}

export interface ProjectsResponse {
  data: ProjectEntry[];
}
