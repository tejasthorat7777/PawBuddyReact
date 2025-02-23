import { useEffect, useState } from "react";
import { cartStyle, flexDiv, h100w100 } from "../../commonFiles/commonTheme";
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
import { CircularProgress } from "@mui/material";

const PaymentAll = () => {
  const user = useSelector((state: RootState) => state.user);
  const lastOrderDetails = user.lastOrder;
  console.log("✌️lastOrderDetails --->", lastOrderDetails);
  const [selectedOption, setSelectedOption] = useState("");

  const moduleName = "PayemntPage";
  const paymentOptions = ["Card", "UPI", "Wallet"];

  const discount = (price: string, discount: string) => {
    const discountOnProduct = Number(price) * Number(discount);
    return (discountOnProduct / 100).toString();
  };

  const getFinalPrice = () => {
    const payablePrice = Number(lastOrderDetails.prodPrice); //+ Number(lastorder.tax.CGST) + Number(lastorder.tax.SGST)
    const discountedPrice = Number(
      discount(lastOrderDetails.prodPrice, lastOrderDetails.prodDiscount)
    );
    const finalPrice = payablePrice - discountedPrice;

    if (finalPrice <= 0) {
      return 0;
    }
    return finalPrice;
  };

  const handlePayOption = (option: string) => {
    setSelectedOption(option);
    console.log("handle Pay Option", option);
  };

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
          lastOrder={lastOrderDetails}
          getPaymentId={getPaymentId}
          discount={discount}
          getFinalPrice={getFinalPrice}
          cartStyle={cartStyle}
        />
        {/* right div*/}
        <div
          style={{
            backgroundColor: "grey",
            width: "50%",
            height: "100%",
            padding: "2%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "8%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              fontSize: "24px",
              marginTop: "5%",
            }}
          >
            {paymentOptions.map((payOption) => (
              <div
                style={{
                  width: "33%",
                  height: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                  color: selectedOption === payOption ? "black" : "white",
                  backgroundColor:
                    selectedOption === payOption ? "white" : "grey",
                  padding: "2%",
                }}
                onClick={() => {
                  handlePayOption(payOption);
                }}
              >
                {payOption}
              </div>
            ))}
          </div>
          <div
            style={{
              height: "80%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            Hello
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentAll;
