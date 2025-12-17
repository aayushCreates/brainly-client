

export type ContentType = "IMAGE" | "VIDEO" | "ARTICLE" | "AUDIO";

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  url?: string;
  tags: string[];
}