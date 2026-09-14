export interface FeedbackAttributes {
  username: string;
  date: string;
  text_en: string;
  text_fr: string;
}

export interface FeedbackEntry {
  id?: number;
  attributes: FeedbackAttributes;
}

export interface FeedbacksResponse {
  data: FeedbackEntry[];
}
