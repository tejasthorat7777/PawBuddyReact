import React, { useEffect, useState } from "react";
import { flexDiv } from "../../commonFiles/commonTheme";
import {
  apiUrl,
  loadCached,
  pawBuddyLogError,
  pawBuddyLogInfo,
} from "../../commonFiles/commonFunctions";
import axios from "axios";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { OrdersData } from "../../commonFiles/commonTypes";

const PaymentAll = () => {
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;
  console.log("customerId: ", customerId);
  const initialCred = {
    prodId: "",
    prodName: "",
    prodDiscrip: "",
    prodImg: "",
    prodPrice: "",
    selected: false,
    customerName: "",
    orderId: "",
    orderDate: "",
    prodDiscount: "",
  };
  const [lastOrder, setLastOrder] = useState<OrdersData>(initialCred);
  const moduleName = "PayemntPage";
  const getLastOrder = async () => {
    try {
      const orderDetail: { data: { items: OrdersData[] } } = await axios.get(
        `${apiUrl}/api/payments/get/${customerId}`
      );
      setLastOrder(orderDetail.data.items[orderDetail.data.items.length - 1]);
    } catch (error) {
      setLastOrder(initialCred);
      pawBuddyLogError(moduleName, error);
    }
  };

  pawBuddyLogInfo(moduleName, JSON.stringify(lastOrder));

  useEffect(() => {
    getLastOrder();
  }, []);
  // const user = "Tejas Thorat";
  const address =
    "omkar tej apartment , near sunshine school, akurdi maharashtra 411033";
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
        }}
      >
        <div
          style={{
            backgroundColor: "#00111c",
            width: "50%",
            height: "100%",
            padding: "2%",
          }}
        >
          <div></div>
        </div>
        <div style={{ backgroundColor: "blue" }}></div>
      </div>
    </div>
  );
};
export default PaymentAll;
