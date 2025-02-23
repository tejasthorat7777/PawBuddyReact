import { CardActionArea, CardMedia } from "@mui/material";
import { iOrderSummary } from "../../commonFiles/commonTypes";
import { paymentStyle } from "./paymentStyle";
import React, { useState } from "react";
import AddressModal from "./AddressModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import {
  apiUrl,
  pawBuddyLogError,
  pawBuddyLogInfo,
} from "../../commonFiles/commonFunctions";

type OverflowTextProps = {
  text: string;
};

const OverflowText: React.FC<OverflowTextProps> = ({ text }) => (
  <div
    style={{ ...paymentStyle.overflowTextWrap, marginTop: "5%" }}
    ref={(el) => {
      if (el)
        el.style.justifyContent =
          el.scrollWidth > el.clientWidth ? "flex-start" : "center";
    }}
  >
    {text}
  </div>
);

const OrderSummary: React.FC<iOrderSummary> = (props) => {
  const moduleName = "OrderSummary";
  const user = useSelector((state: RootState) => state.user);
  const username = user.username;
  const userAddress = user.address ?? "";
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [address, setAddress] = useState(userAddress);

  const details = [
    {
      label: "Price of Product",
      value: `${props.lastOrder.prodPrice || 500}.00 Rs.`,
    },
    {
      label: "Discount",
      value: `${
        props.discount(
          props.lastOrder.prodPrice,
          props.lastOrder.prodDiscount
        ) || 500
      }.00 Rs.`,
    },
    { label: "CGST", value: "0.00 Rs." },
    { label: "SGST", value: "0.00 Rs." },
    { label: "Total", value: `${props.getFinalPrice()}.00 Rs.` },
  ];

  const updateAddress = async (updatedAddress: string) => {
    if (address) {
      pawBuddyLogInfo(moduleName, "No need to update address");
      return;
    }
    try {
      await axios.post(`${apiUrl}/api/saveAddress`, {
        updatedAddress,
        username,
      });
    } catch (error) {
      pawBuddyLogError(moduleName, error);
    }
  };
  return (
    <div style={paymentStyle.outerDiv}>
      <div>
        <div>
          <div
            style={{
              ...paymentStyle.dateTransactionOuterDiv,
              textAlign: "center",
            }}
          >
            <div style={paymentStyle.commonDateAndTrans}>
              Date - <br />
              {props.lastOrder.orderDate}
            </div>
            <div style={paymentStyle.commonDateAndTrans}>
              Transaction id - <br />{" "}
              {props.getPaymentId(props.lastOrder.orderId)}
            </div>
          </div>

          <div
            style={{ ...paymentStyle.breakupOuter, flexDirection: "column" }}
          >
            {details.map(({ label, value }, i) => (
              <React.Fragment key={i}>
                {i === details.length - 1 && (
                  <div style={paymentStyle.horizontalLine}></div>
                )}

                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ ...paymentStyle.leftText, textAlign: "left" }}>
                    {label}
                  </div>
                  <div
                    style={{
                      ...paymentStyle.middleSign,
                      textAlign: "center",
                    }}
                  >
                    :
                  </div>
                  <div
                    style={{ ...paymentStyle.rightValue, textAlign: "right" }}
                  >
                    {value}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <OverflowText
            text={`Product Name - ${
              props.lastOrder.prodDiscrip || props.lastOrder.prodName
            }`}
          />

          <div style={paymentStyle.imgDiv}>
            <CardActionArea sx={props.cartStyle.cardAction}>
              <CardMedia
                sx={props.cartStyle.cardMedia}
                data-testid={`payment_${props.lastOrder.prodId}`}
              >
                <img
                  src={props.lastOrder.prodImg}
                  alt="Product Image payment"
                  style={props.cartStyle.imageStyle}
                />
              </CardMedia>
            </CardActionArea>
          </div>

          <OverflowText
            text={`Delivery To - ${
              props.lastOrder.customerName || "Tejas Arun Thorat"
            }`}
          />

          <div style={paymentStyle.addressOuter}>
            <div style={{ height: "100%", width: "20%", fontSize: "20px" }}>
              Address -{" "}
            </div>
            <div
              style={{
                ...paymentStyle.addressWrap,
                WebkitBoxOrient: "vertical",
              }}
            >
              {address}
            </div>
          </div>
        </div>
        {!address && (
          <AddressModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={(enteredAddress: string) => {
              setAddress(enteredAddress);
              updateAddress(enteredAddress);
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default OrderSummary;
