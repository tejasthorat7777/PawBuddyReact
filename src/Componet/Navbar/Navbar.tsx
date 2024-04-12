import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "8vh",
        overflow: "hidden",
        backgroundColor: "#00111c",
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <img
          src={logo}
          alt="LOGO"
          style={{ height: "100%", scale: "0.8", marginLeft: "3.5%" }}
        />
      </div>
    </div>
  );
}
