export interface UserInfo {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface ResponseUser {
  user: UserInfo;
}
