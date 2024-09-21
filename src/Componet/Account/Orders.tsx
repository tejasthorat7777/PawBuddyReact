import React, { useEffect, useState } from "react";
import {
  cartStyle,
  flexDiv,
  h100w100,
  homeStyle,
  ordersCss,
  universalDiv,
} from "../../commonFiles/commonTheme";
import {
  Button,
  CardActionArea,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { ClickableText } from "../../commonFiles/Clickabletext";
import axios from "axios";
import {
  apiUrl,
  clearData,
  currency,
  loadCached,
} from "../../commonFiles/commonFunctions";
import { OrdersData } from "../../commonFiles/commonTypes";
import { EmptyOrders } from "../../Lottie/lottieComponent/EmptyOrders";
import { FetchErrorEmptyCart } from "../../Lottie/lottieComponent/FetchErrorEmptyCart";

const NoOrder = () => {
  return (
    <div style={{ ...h100w100, ...flexDiv }}>
      You Don't have any Order yett
      <EmptyOrders />
    </div>
  );
};

function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrdersData[]>([]);
  const [noOrder, setNoOrder] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;

  const getOrderDetails = async (customerId: string) => {
    try {
      setIsLoading(true);
      const cachedCart = loadCached("cachedOrders");
      if (cachedCart) {
        setOrders(cachedCart);
        setIsLoading(false);
        return;
      }
      const getData = await axios.get(`${apiUrl}/orders/get/${customerId}`);
      if (getData.data.items.length === 0) {
        setNoOrder(true);
      } else {
        localStorage.setItem(
          "cachedOrders",
          JSON.stringify(getData.data.items)
        );
        setOrders(getData.data.items);
      }
    } catch (error) {
      console.log("error>>>", error);
      setFetchError("Sorry We are unable to get your Items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    clearData("cachedOrders");
    if (customerId) {
      getOrderDetails(customerId);
    }
  }, [customerId]);

  const detailsConst = ["Order Placed", "Total", "Ship To"];
  const buttonsText = [
    "Buy Again",
    "Track Package",
    "Write Product Review",
    "Return or Replace",
  ];

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        padding: "2%",
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <div style={universalDiv}>
          <CircularProgress
            data-testid="loader"
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : customerId === "" ? (
        <div style={universalDiv}>
          Please Login
          <LoginRequired />
        </div>
      ) : fetchError ? (
        <div style={universalDiv}>
          {fetchError}
          <FetchErrorEmptyCart />
        </div>
      ) : orders.length ? (
        orders.map((obj, index) => (
          <div key={`order_${index}`} style={ordersCss.orderOuter}>
            <div style={ordersCss.dateAndOrderIdOuter}>
              <div style={ordersCss.datePriceAndShip}>
                {detailsConst.map((text, index) => {
                  const displayValue =
                    text === "Order Placed"
                      ? obj.orderDate
                      : text === "Total"
                      ? `${currency} ${obj.prodPrice}`
                      : text === "Ship To"
                      ? obj.customerName
                      : null;

                  return (
                    <div key={index.toString()} style={ordersCss.textCss}>
                      {text}
                      {displayValue && (
                        <>
                          <br />
                          {displayValue}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={ordersCss.orderId}>
                <div style={ordersCss.textCss}>
                  Order # {obj.orderId}
                  <div>
                    <ClickableText
                      text={"View order details"}
                      style={{ marginRight: "5%" }}
                    />
                    |
                    <ClickableText
                      text={"Invoice"}
                      style={{ marginLeft: "5%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={ordersCss.downDiv}>
              <div style={ordersCss.imageDiv}>
                <CardActionArea sx={cartStyle.cardAction}>
                  <CardMedia sx={cartStyle.cardMedia}>
                    <img src={obj.prodImg} style={cartStyle.imageStyle} />
                  </CardMedia>
                </CardActionArea>
              </div>
              <div style={ordersCss.discriptionDiv}>{obj.prodDiscrip}</div>
              <div style={ordersCss.buttons}>
                {buttonsText.map((text, index) => (
                  <Button
                    data-testid={`button${index}`}
                    style={{
                      ...homeStyle.IconButton,
                      fontSize: "100%",
                      backgroundColor:
                        hoveredButton === `button${index}`
                          ? "#e85d04"
                          : "#ffbe0b",
                      width: "100%",
                      marginTop: "5%",
                      borderRadius: "15px",
                      fontFamily: "cursive",
                      textTransform: "none",
                    }}
                    onMouseEnter={() => setHoveredButton(`button${index}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : null}
      {noOrder && <NoOrder />}
      <div data-testid="toast">
        <ToastContainer
          position="bottom-left"
          toastClassName={styles.toast}
          bodyClassName={styles.body}
          hideProgressBar={true}
          autoClose={1000}
        />
      </div>
    </div>
  );
}
export default Orders;
