export type ProfileType =
  | "/"
  | "/profile"
  | "/WishList"
  | "/orders"
  | "/contact"
  | "/settings"
  | "/login";

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

export type SubmitButtonProps = {
  operationOnData: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  style?: React.CSSProperties;
  text: string;
};

