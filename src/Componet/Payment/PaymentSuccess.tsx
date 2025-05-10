import React from "react";
import { CheckCircle, ArrowRight, Download } from "lucide-react";

interface PaymentSuccessProps {
  onBackToShopping: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  onBackToShopping,
}) => {
  const orderId =
    "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#4f46e5",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <CheckCircle
            size={56}
            color="#ffffff"
            style={{ margin: "0 auto 1rem" }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "0.25rem",
            }}
          >
            Payment Successful!
          </h2>
          <p style={{ color: "#c7d2fe" }}>Your order has been placed</p>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
              Order ID
            </p>
            <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{orderId}</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                Date
              </p>
              <p style={{ fontWeight: 500 }}>{date}</p>
            </div>
            <div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                Amount Paid
              </p>
              <p style={{ fontWeight: 500 }}>₹3,284.00</p>
            </div>
            <div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                Payment Method
              </p>
              <p style={{ fontWeight: 500 }}>Credit Card</p>
            </div>
            <div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                Status
              </p>
              <p style={{ fontWeight: 500, color: "#16a34a" }}>Confirmed</p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              We've sent the order confirmation and details to your email.
            </p>
            <button
              onClick={() => {
                // Download receipt logic
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "#4f46e5",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              <Download size={16} style={{ marginRight: "0.5rem" }} />
              Download Receipt
            </button>
          </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <button
              onClick={onBackToShopping}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              Continue Shopping{" "}
              <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
            </button>
            <button
              onClick={() => {
                // Track order logic
              }}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: "#ffffff",
                color: "#374151",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
