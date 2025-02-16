import { useEffect, useState } from "react";
import { cartStyle, flexDiv } from "../../commonFiles/commonTheme";
import {
  apiUrl,
  getPaymentId,
  pawBuddyLogError,
} from "../../commonFiles/commonFunctions";
import axios from "axios";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { OrdersData } from "../../commonFiles/commonTypes";
import OrderSummary from "./OrderSummary";
import powerRanger from "../../assets/power_ranger.jpg";

const PaymentAll = () => {
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;

  const initialCred = {
    prodId: "",
    prodName: "Samurai power Rangers",
    prodDiscrip: "",
    prodImg: powerRanger,
    prodPrice: "500",
    selected: false,
    customerName: "",
    orderId: "1234efrt56778",
    orderDate: "16 February 2025",
    prodDiscount: "10",
  };
  const [lastOrder, setLastOrder] = useState<OrdersData>(initialCred);
  

  const moduleName = "PayemntPage";
  const getLastOrder = async () => {
    try {
      const orderDetail: { data: { items: OrdersData[] } } = await axios.get(
        `${apiUrl}/api/payments/get/${customerId}`
      );
      const lastOrderIndex = orderDetail.data.items.length - 1;
      setLastOrder(orderDetail.data.items[lastOrderIndex]);
    } catch (error) {
      setLastOrder(initialCred);
      pawBuddyLogError(moduleName, error);
    }
  };

  const discount = (price: string, discount: string) => {
    const discountOnProduct = Number(price) * Number(discount);
    return (discountOnProduct / 100).toString();
  };

  const getFinalPrice = () => {
    const payablePrice = Number(lastOrder.prodPrice); //+ Number(lastorder.tax.CGST) + Number(lastorder.tax.SGST)
    const discountedPrice = Number(
      discount(lastOrder.prodPrice, lastOrder.prodDiscount)
    );
    const finalPrice = payablePrice - discountedPrice;

    if (finalPrice <= 0) {
      return 0;
    }
    return finalPrice;
  };

  useEffect(() => {
    getLastOrder();
  }, [lastOrder]);

  const address1 =
    "omkar tej apartment , Dagadoba Chauk ,near sunshine school, akurdi maharashtra 411033 pune nagpur nashik rdcfvgbh;pjlkh  xcgvhbjng hgv tyfbj";
  return (
    <div
      style={{
        padding: "2%",
        ...flexDiv,
        backgroundColor: "#597081",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "65%",
          height: "95%",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <OrderSummary
          lastOrder={lastOrder}
          getPaymentId={getPaymentId}
          discount={discount}
          getFinalPrice={getFinalPrice}
          cartStyle={cartStyle}
        />
        {/* right div*/}
        <div
          style={{
            backgroundColor: "white",
            width: "50%",
            height: "100%",
            padding: "2%",
          }}
        ></div>
      </div>
    </div>
  );
};
export default PaymentAll;
