export type ProfileType =
  | ""
  | "profile"
  | "WishList"
  | "Orders"
  | "Contact"
  | "Settings"
  | "Logout";

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
};
