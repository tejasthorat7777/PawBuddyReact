import React from "react";
import { ShieldCheck } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface OrderSummaryProps {
  orderData: OrderData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderData }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        position: "sticky",
        top: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.125rem",
          fontWeight: 500,
          color: "#111827",
          marginBottom: "1rem",
        }}
      >
        Order Summary
      </h2>

      {/* Order items */}
      <ul style={{ marginTop: "-1rem", borderTop: "1px solid #e5e7eb" }}>
        {orderData.items.map((item) => (
          <li
            key={item.id}
            style={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                height: "4rem",
                width: "4rem",
                flexShrink: 0,
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Item
              </span>
            </div>
            <div style={{ marginLeft: "1rem", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                Qty {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Price breakdown */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}
        >
          <p>Subtotal</p>
          <p>₹{orderData.subtotal.toLocaleString()}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}
        >
          <p>Shipping</p>
          <p>
            {orderData.shipping === 0
              ? "Free"
              : `₹${orderData.shipping.toLocaleString()}`}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}
        >
          <p>Taxes</p>
          <p>₹{orderData.tax.toLocaleString()}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#111827",
            paddingTop: "1rem",
            marginTop: "0.5rem",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p>Total</p>
          <p>₹{orderData.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Trust badges */}
      <div
        style={{
          marginTop: "1.5rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}
        >
          <ShieldCheck
            size={18}
            color="#10b981"
            style={{ marginRight: "0.5rem" }}
          />
          <p>100% secure checkout</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <img
            src="https://i.imgur.com/ZLsWebc.png"
            alt="Visa"
            style={{ height: "2rem" }}
          />
          <img
            src="https://i.imgur.com/k70V1Sv.png"
            alt="Mastercard"
            style={{ height: "2rem" }}
          />
          <img
            src="https://i.imgur.com/WIAP81Z.png"
            alt="RuPay"
            style={{ height: "2rem" }}
          />
          <img
            src="https://i.imgur.com/pqeXfab.png"
            alt="UPI"
            style={{ height: "2rem" }}
          />
        </div>
      </div>

      {/* Additional info */}
      <div
        style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#6b7280" }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          Your order will be processed securely with end-to-end encryption.
        </p>
        <p>
          By completing this purchase, you agree to our{" "}
          <a href="#" style={{ color: "#4f46e5", textDecoration: "none" }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "#4f46e5", textDecoration: "none" }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
