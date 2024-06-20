export type ProfileType =
  | "/"
  | "/profile"
  | "/WishList"
  | "/orders"
  | "/contact"
  | "/settings"
  | "/logout";

export type UserData = {
  city: string;
  gender: string;
  name: string;
  age: string;
  breed: string;
  birthdate: string;
  owner: string;
  identification: string;
  username: string;
  password: string;
  userId: string;
};
