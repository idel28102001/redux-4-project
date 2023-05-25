export interface Author {
  bio: null;
  username: string;
  image: string;
  following: boolean;
}

export interface ArticleItem {
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tagList: Array<string>;
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  title: string;
}

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
