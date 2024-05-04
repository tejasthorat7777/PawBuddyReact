import { TextField } from "@mui/material";
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
      <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img
          src={logo}
          alt="LOGO"
          style={{ height: "100%", scale: "0.8", marginLeft: "3.5%" }}
        />
        <div style={{ width: "15%", height: "50%", backgroundColor: "red" }}>
          <input type="text" placeholder="Search" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
}
