import { Paragraph } from '../posts';

export interface PostPreview {
  title: String;
  date: Date;
  category: String;
  headline: String;
  body: Array<Paragraph>;
}


