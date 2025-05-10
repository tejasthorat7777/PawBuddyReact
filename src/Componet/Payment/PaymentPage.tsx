import React, { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import { ArrowLeft } from "lucide-react";
import PaymentSuccess from "./PaymentSuccess";
import UPIPaymentForm from "./UPIPaymentForm";
import OrderSummary from "./OrderSummary_1";
import { flexDiv } from "../../commonFiles/commonTheme";
import PaymentMethodSelector from "./PaymentMethodSelector";

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
    <div style={{ minHeight: "100vh"}}>
      <div style={{ ...flexDiv, padding: "2%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <button
              style={{
                marginRight: "1rem",
                padding: "0.5rem",
                borderRadius: "9999px",
                backgroundColor: "transparent",
                transition: "background-color 0.2s ease",
              }}
              onClick={handleBackToShopping}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <ArrowLeft size={20} />
            </button>
            <h1
              style={{ fontSize: "1.25rem", fontWeight: 500, color: "#111827" }}
            >
              Checkout
            </h1>
          </div>

          {/* Payment form */}
          <section style={{ gridColumn: "span 7" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                marginBottom: "1.5rem",
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
          </section>

          {/* Order summary */}
          <section style={{ gridColumn: "span 5" }}>
            <OrderSummary orderData={orderData} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
