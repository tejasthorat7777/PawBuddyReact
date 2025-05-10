import React, { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onSubmit,
  isProcessing,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!cardNumber.trim() || cardNumber.replace(/\s+/g, "").length < 16) {
      newErrors.cardNumber = "Valid card number is required";
    }

    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    if (!expiry.trim() || expiry.length !== 5) {
      newErrors.expiry = "Valid expiry date is required (MM/YY)";
    }

    if (!cvv.trim() || cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        {/* Card number */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="cardNumber"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4B5563",
              marginBottom: "0.25rem",
            }}
          >
            Card Number
          </label>
          <div
            style={{
              position: "relative",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              border: errors.cardNumber
                ? "2px solid #F87171"
                : "1px solid #D1D5DB",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0.75rem",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <CreditCard size={20} style={{ color: "#9CA3AF" }} />
            </div>
            <input
              type="text"
              id="cardNumber"
              style={{
                width: "100%",
                paddingLeft: "2.5rem",
                paddingRight: "3rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                borderColor: "#D1D5DB",
                outline: "none",
              }}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
            {cardNumber && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0.75rem",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                {cardNumber.startsWith("4") && (
                  <span style={{ color: "#3B82F6", fontWeight: "600" }}>
                    Visa
                  </span>
                )}
                {cardNumber.startsWith("5") && (
                  <span style={{ color: "#EF4444", fontWeight: "600" }}>
                    Mastercard
                  </span>
                )}
                {cardNumber.startsWith("6") && (
                  <span style={{ color: "#10B981", fontWeight: "600" }}>
                    RuPay
                  </span>
                )}
              </div>
            )}
          </div>
          {errors.cardNumber && (
            <p
              style={{
                marginTop: "0.25rem",
                fontSize: "0.875rem",
                color: "#F87171",
              }}
            >
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Cardholder name */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="cardName"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4B5563",
              marginBottom: "0.25rem",
            }}
          >
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            style={{
              width: "100%",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              fontSize: "0.875rem",
              borderRadius: "0.375rem",
              borderColor: "#D1D5DB",
              outline: "none",
              border: errors.cardName
                ? "2px solid #F87171"
                : "1px solid #D1D5DB",
            }}
            placeholder="John Smith"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          {errors.cardName && (
            <p
              style={{
                marginTop: "0.25rem",
                fontSize: "0.875rem",
                color: "#F87171",
              }}
            >
              {errors.cardName}
            </p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="expiry"
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
                marginBottom: "0.25rem",
              }}
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              style={{
                width: "100%",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                borderColor: "#D1D5DB",
                outline: "none",
                border: errors.expiry
                  ? "2px solid #F87171"
                  : "1px solid #D1D5DB",
              }}
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
            />
            {errors.expiry && (
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#F87171",
                }}
              >
                {errors.expiry}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="cvv"
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
                marginBottom: "0.25rem",
              }}
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              style={{
                width: "100%",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                borderColor: "#D1D5DB",
                outline: "none",
                border: errors.cvv ? "2px solid #F87171" : "1px solid #D1D5DB",
              }}
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={4}
            />
            {errors.cvv && (
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#F87171",
                }}
              >
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* Save card checkbox */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="saveCard"
            name="saveCard"
            type="checkbox"
            style={{ height: "1rem", width: "1rem", color: "#4F46E5" }}
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
          />
          <label
            htmlFor="saveCard"
            style={{
              fontSize: "0.875rem",
              color: "#4B5563",
              marginLeft: "0.5rem",
            }}
          >
            Save card for future payments
          </label>
        </div>

        {/* Security notice */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "#6B7280",
            marginTop: "1rem",
          }}
        >
          <Lock size={16} style={{ marginRight: "0.5rem" }} />
          <p>Your payment information is encrypted and secure</p>
        </div>

        {/* Submit button */}
        <div style={{ marginTop: "1.5rem" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              fontSize: "1rem",
              fontWeight: "500",
              color: "white",
              backgroundColor: "#4F46E5",
              borderRadius: "0.375rem",
              border: "none",
              cursor: isProcessing ? "not-allowed" : "pointer",
              opacity: isProcessing ? 0.75 : 1,
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ₹3,284`
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreditCardForm;
