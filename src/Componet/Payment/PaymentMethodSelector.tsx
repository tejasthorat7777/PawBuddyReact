import React from "react";
import { CreditCard, QrCode, Check } from "lucide-react";

interface PaymentMethodSelectorProps {
  selected: string;
  onChange: (method: "card" | "upi") => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selected,
  onChange,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "1fr",
  };

  const cardStyle: React.CSSProperties = {
    border: "1px solid",
    borderRadius: "0.5rem",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 300ms ease",
    padding: "1rem",
  };

  const iconWrapperStyle = (isSelected: boolean): React.CSSProperties => ({
    borderRadius: "9999px",
    padding: "0.5rem",
    marginRight: "0.75rem",
    backgroundColor: isSelected ? "#e0e7ff" : "#f3f4f6", // indigo-100 / gray-100
    color: isSelected ? "#4f46e5" : "#4b5563", // indigo-600 / gray-600
  });

  const cardWrapperStyle = (isSelected: boolean): React.CSSProperties => ({
    ...cardStyle,
    borderColor: isSelected ? "#6366f1" : "#e5e7eb", // indigo-500 / gray-200
    backgroundColor: isSelected ? "#eef2ff" : "transparent", // indigo-50
    boxShadow: isSelected ? "0 0 0 1px #6366f1" : undefined, // ring-1 ring-indigo-500
  });

  return (
    <div
      style={{
        ...containerStyle,
        ...(window.innerWidth >= 640 && { gridTemplateColumns: "1fr 1fr" }),
      }}
    >
      {/* Card Option */}
      <div
        style={cardWrapperStyle(selected === "card")}
        onClick={() => onChange("card")}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={iconWrapperStyle(selected === "card")}>
            <CreditCard size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontWeight: 500 }}>Credit / Debit Card</h3>
              {selected === "card" && (
                <span style={{ color: "#4f46e5" }}>
                  <Check size={18} />
                </span>
              )}
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.25rem",
              }}
            >
              Visa, Mastercard, RuPay & more
            </p>
          </div>
        </div>
      </div>

      {/* UPI Option */}
      <div
        style={cardWrapperStyle(selected === "upi")}
        onClick={() => onChange("upi")}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={iconWrapperStyle(selected === "upi")}>
            <QrCode size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontWeight: 500 }}>UPI</h3>
              {selected === "upi" && (
                <span style={{ color: "#4f46e5" }}>
                  <Check size={18} />
                </span>
              )}
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.25rem",
              }}
            >
              Google Pay, PhonePe, BHIM UPI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
