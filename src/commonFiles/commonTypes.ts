export type UserData = {
  acc_type: string;
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
  address: string;
  lastOrder: OrdersData;
};

export type iProductPage = {
  callback: () => Promise<any[]>;
  cacheKey: string;
};
export type iRenderProducts = {
  products: ProductData[];
  handleShare: (name: string, price: string) => void;
  addToWishlist: (card: ProductData) => void;
  addTocart: (card: ProductData) => void;
  wishlistItems: WishListData[];
  cartList: CartListData[];
};

export type SubmitButtonProps = {
  operationOnData: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  style?: React.CSSProperties;
  text: string;
};

export type ClickableProps = {
  onClick?: () => void;
  text: string;
  style?: React.CSSProperties;
  id: string;
};

export type QuantProps = {
  id: any;
  style?: React.CSSProperties;
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
  category: string;
  subCategory: string;
};

export interface BusinessProduct {
  customerId: string;
  item: ProductData[];
}

export type WishListData = {
  prodId: string;
  prodName: string;
  prodDiscrip: string;
  prodImg: string;
  prodPrice: string;
  prodDiscount: string;
  selected: boolean;
};

export type CartListData = {
  prodName: string;
  prodId: string;
  prodDiscrip: string;
  prodImg: string;
  prodPrice: string;
  rating: number;
  prodDiscount: string;
};

export type OrdersData = {
  prodId: string;
  prodName: string;
  prodDiscrip: string;
  prodImg: string;
  prodPrice: string;
  selected: Boolean;
  customerName: string;
  orderId: string;
  orderDate: string;
  prodDiscount: string;
  /**
   * //TODO for future reference
 *tax:{
    CGST:number,
    SCGST:number
  }
 */
};

export type iOrderSummary = {
  lastOrder: OrdersData;
  getPaymentId: (orderId: string) => string;
  discount: (price: string, discount: string) => string;
  getFinalPrice: () => number;
  cartStyle: any;
};
