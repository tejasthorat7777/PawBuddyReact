import logo from "../../assets/logo.png";
import { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Tooltip } from "@mui/material";

const navStyle = {
  display: "flex",
  flexDirection: "column",
  height: "8vh",
  overflow: "hidden",
  backgroundColor: "#00111c"
}

const inputStyle = {
  width: "100%", 
  height: "100%", 
  backgroundColor: "transparent",
  color: "white", 
  outline: "0", 
  border: "none"
}

const innerNav = {
  height: "100%", 
  width: "100%", 
  display: "flex",
  alignItems: "center", 
  justifyContent: "space-between"
}

const navLeft = {
  display: "flex",
  alignItems: "center", 
  height: "100%", 
  width: "100%", 
  paddingLeft: "1rem"
}

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  const inputDivStyle = {
    width: "15%", 
    height: "50%",
    borderBottom: isHovered ? "2px solid white" : "1px solid white",
    display: "flex", 
    alignItems: "center"
  }

  return (
    <div style={navStyle}
    >
      <div style={innerNav}>
        <div
          style={navLeft}>
          <Tooltip title="Profile"><AccountCircleOutlinedIcon style={{ color: "#CFCFCD" }} fontSize="large" /></Tooltip>
          {/* <ShoppingCartOutlinedIcon fontSize="medium" style={{ color: "#BEA8A7", marginLeft: "2rem" }} /> */}
          <img
            src={logo}
            alt="LOGO"
            style={{ height: "100%", scale: "0.8", marginLeft: "2rem" }}
          />
        </div>
        <div
          style={inputDivStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <input type="text" placeholder="search..."
            style={inputStyle} />
        </div>
      </div>
    </div>
  );
}
