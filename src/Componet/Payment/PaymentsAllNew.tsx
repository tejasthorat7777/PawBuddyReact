import React from "react";
import PaymentPage from "./PaymentPage";

function PaymentsAllNew() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F3F4F6", // Tailwind's gray-100
      }}
    >
      <PaymentPage />
    </div>
  );
}

export default PaymentsAllNew;
