import React, { useState } from "react";
import { flexDiv, h100w100, homeStyle } from "../../commonFiles/commonTheme";
import { CircularProgress } from "@mui/material";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { ClickableText } from "../../commonFiles/Clickabletext";
function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;

  const temp = [
    {
      text: "tejas",
      date: "15 September 2024",
      total: "₹299",
      customer: "Arun Thorat",
      orderId: "406-3326306-7330700",
    },
  ];

  const detailsConst = ["ORDER PLACED", "TOTAL", "SHIP TO"];

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        padding: "2%",
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress
            data-testid="loader"
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : customerId === "" ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            ...flexDiv,
          }}
        >
          Please Login
          <LoginRequired />
        </div>
      ) : (
        temp.map((obj, index) => (
          <div
            key={`order_${index}`}
            style={{
              width: "90%",
              height: "60%",
              backgroundColor: "#FFFFFF",
              marginLeft: "5%",
              marginBottom: "5%",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "20%",
                backgroundColor: "#bac5cb",
                borderRadius: "10px 10px 0rem 0rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  padding: "2%",
                  ...flexDiv,
                  justifyContent: "space-evenly",
                }}
              >
                {detailsConst.map((text, index) => {
                  const displayValue =
                    text === "ORDER PLACED"
                      ? obj.date
                      : text === "TOTAL"
                      ? obj.total
                      : text === "SHIP TO"
                      ? obj.customer
                      : null;

                  return (
                    <div
                      key={index.toString()}
                      style={{
                        fontSize: "14px",
                        fontFamily: "cursive",
                      }}
                    >
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
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  ...flexDiv,
                  justifyContent: "flex-end",
                  padding: "2%",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontFamily: "cursive",
                  }}
                >
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
            {obj.text}
          </div>
        ))
      )}
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
