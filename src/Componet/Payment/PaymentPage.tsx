import React, { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import { ArrowLeft } from "lucide-react";
import PaymentSuccess from "./PaymentSuccess";
import UPIPaymentForm from "./UPIPaymentForm";
import OrderSummary from "./OrderSummary_1";
import { flexDiv } from "../../commonFiles/commonTheme";
import PaymentMethodSelector from "./PaymentMethodSelector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const orderData = {
  items: [
    { id: 1, name: "Premium Headphones", price: 2499, quantity: 1 },
    { id: 2, name: "Phone Case (Black)", price: 599, quantity: 1 },
  ],
  subtotal: 3098,
  shipping: 0,
  tax: 186,
  total: 3284,
};

type PaymentMethod = "card" | "upi";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };

  const handleBackToShopping = () => {
    setPaymentComplete(false);
  };

  if (paymentComplete) {
    return <PaymentSuccess onBackToShopping={handleBackToShopping} />;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ ...flexDiv, padding: "2%" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
          }}
        >
          {/* Order summary */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "7%",
              left: "15%",
            }}
          >
            <OrderSummary orderData={orderData} />
          </div>

          {/* Payment form */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: "40rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                width: "85%",
                scale: "0.94",
                height: "600px", // Set a fixed height here
                overflowY: "auto", // Allows scrolling if content overflows
                transition: "height 0.3s ease", // Option
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "#111827",
                  marginBottom: "1.5rem",
                }}
              >
                Payment Method
              </h2>

              <PaymentMethodSelector
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />

              <div style={{ marginTop: "2rem" }}>
                {paymentMethod === "card" ? (
                  <CreditCardForm
                    onSubmit={handlePaymentSubmit}
                    isProcessing={isProcessing}
                  />
                ) : (
                  <UPIPaymentForm
                    onSubmit={handlePaymentSubmit}
                    isProcessing={isProcessing}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
