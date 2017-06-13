export class Post {
    title: string;
    date: Date;
    category: string;
    content: string;
}

export class FullPost {
  _id: string;
  body: string;
  category : string;
  date : Date ;
  postId : string;
  title: string;
  urlSlug : string;
}
