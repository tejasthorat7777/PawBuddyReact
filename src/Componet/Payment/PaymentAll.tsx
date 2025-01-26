import React from "react";
import { flexDiv } from "../../commonFiles/commonTheme";

const PaymentAll = () => {
  const user = "Tejas Thorat";
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
          width: "30%",
          height: "95%",
          backgroundColor: "white",
          borderRadius: "5%",
          padding: "2%",
        }}
      >
        <div>
          <div>
            <span>{`Delivering to ${user}`}</span>
          </div>
          <div style={{ marginTop: "2%" }}>
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentAll;
