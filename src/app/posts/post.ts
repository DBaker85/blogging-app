export interface Post {
  title: string;
  date: Date;
  category: string;
  content: string;
  urlSlug: string;
  headline: string;
}

export interface FullPost {
  _id: string;
  body: Array<Paragraph> | null;
  category: string;
  date: Date ;
  postId: string;
  title: string;
  urlSlug: string;
  headline: string;
}

export interface Paragraph {
  type: string;
  content: string;
  language?: string;
  legend?: string;
}
