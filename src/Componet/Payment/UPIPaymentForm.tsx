import React, { useState } from "react";
import { QrCode, RefreshCcw, Smartphone, ArrowRight } from "lucide-react";

interface UPIPaymentFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const UPIPaymentForm: React.FC<UPIPaymentFormProps> = ({
  onSubmit,
  isProcessing,
}) => {
  const [upiMethod, setUpiMethod] = useState<"id" | "qr">("id");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const upiApps = [
    { id: "gpay", name: "Google Pay", logo: "https://i.imgur.com/0hOGQOW.png" },
    { id: "phonepe", name: "PhonePe", logo: "https://i.imgur.com/eaqlZae.png" },
    { id: "paytm", name: "Paytm", logo: "https://i.imgur.com/MrKcTpa.png" },
    { id: "bhim", name: "BHIM UPI", logo: "https://i.imgur.com/JnTKZGR.png" },
  ];

  const handleUpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (upiMethod === "id" && !upiId.trim()) {
      setErrors({ upiId: "Please enter a valid UPI ID" });
      return;
    }

    if (upiMethod === "id" && !upiId.includes("@")) {
      setErrors({ upiId: "UPI ID must include @ symbol (e.g., name@upi)" });
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <div>
      {/* Payment method selector */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          type="button"
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            backgroundColor: upiMethod === "id" ? "#E0E7FF" : "#F3F4F6",
            color: upiMethod === "id" ? "#4338CA" : "#4B5563",
            fontWeight: upiMethod === "id" ? 600 : 400,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setUpiMethod("id")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Smartphone size={18} style={{ marginRight: 8 }} />
            <span>UPI ID / Mobile</span>
          </div>
        </button>

        <button
          type="button"
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            backgroundColor: upiMethod === "qr" ? "#E0E7FF" : "#F3F4F6",
            color: upiMethod === "qr" ? "#4338CA" : "#4B5563",
            fontWeight: upiMethod === "qr" ? 600 : 400,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setUpiMethod("qr")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QrCode size={18} style={{ marginRight: 8 }} />
            <span>QR Code</span>
          </div>
        </button>
      </div>

      {upiMethod === "id" ? (
        <form onSubmit={handleUpiSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="upiId"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: 4,
              }}
            >
              Enter UPI ID / Mobile Number
            </label>
            <input
              type="text"
              id="upiId"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: errors.upiId ? "2px solid #EF4444" : "none",
              }}
            />
            {errors.upiId && (
              <p
                style={{ color: "#DC2626", fontSize: "0.875rem", marginTop: 4 }}
              >
                {errors.upiId}
              </p>
            )}
            <p style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: 4 }}>
              Example: 9876543210@upi or yourname@okhdfcbank
            </p>
          </div>

          {/* UPI App Options */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontWeight: 500,
                fontSize: "0.875rem",
                marginBottom: 12,
              }}
            >
              Or choose a UPI App
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.75rem",
              }}
            >
              {upiApps.map((app) => (
                <div
                  key={app.id}
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setUpiId(`${app.id}@upi`)}
                >
                  <img
                    src={app.logo}
                    alt={app.name}
                    style={{ width: 32, height: 32, marginBottom: 4 }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "#374151" }}>
                    {app.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.375rem",
                border: "none",
                color: "white",
                backgroundColor: "#4F46E5",
                cursor: isProcessing ? "not-allowed" : "pointer",
                opacity: isProcessing ? 0.75 : 1,
                fontWeight: 500,
              }}
            >
              {isProcessing ? (
                <>
                  <svg
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 8,
                      animation: "spin 1s linear infinite",
                      verticalAlign: "middle",
                    }}
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
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Pay with UPI"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "1px solid #E5E7EB",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              position: "relative",
              background: "white",
            }}
          >
            <img
              src="https://i.imgur.com/kXg40L7.png"
              alt="QR Code"
              style={{ width: 192, height: 192 }}
            />
            <button
              title="Refresh QR code"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#F3F4F6",
                padding: "0.25rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <RefreshCcw size={16} />
            </button>
          </div>

          <p style={{ color: "#374151", marginBottom: "1rem" }}>
            Scan this QR code using any UPI app to pay
          </p>

          <div
            style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}
          >
            {upiApps.map((app) => (
              <img
                key={app.id}
                src={app.logo}
                alt={app.name}
                style={{ width: 32, height: 32 }}
              />
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                marginBottom: 8,
              }}
            >
              Amount: ₹3,284
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
              QR code is valid for 10:00 minutes
            </p>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            style={{
              marginTop: "1.5rem",
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: "#4F46E5",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            I've completed the payment{" "}
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UPIPaymentForm;
