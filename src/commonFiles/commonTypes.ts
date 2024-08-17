export type ProfileType =
  | "/"
  | "/profile"
  | "/wishList"
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


export type State = {
  status: boolean;
  user: UserData;
};

export type ProductData = {
  prodId: string;
  prodName: string;
  prodDiscrip: string;
  prodPrice: string;
  pordQuant: string;
  prodDiscount: string;
  prodBrand: string;
  prodWeight: string;
  prodConditon: string;
  prodImg: string;
  selected: boolean;
  rating: number;
};