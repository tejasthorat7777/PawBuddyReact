import logo from "../../assets/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, IconButton, ListItemIcon, Menu, Tooltip } from "@mui/material";
import { CustomMenuItem } from "../../commonFiles/commonTheme";
import { Logout } from "@mui/icons-material";
import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import { Link } from "react-router-dom";
import { persistor } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/Slices";
import { clearAllData } from "../../commonFiles/commonFunctions";

const inputStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  color: "white",
  outline: "0",
  border: "none",
};

const innerNav = {
  height: "8vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#00111c",
};

const navLeft = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

export default function BusinessNavbar() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputDivStyle = {
    width: "10rem",
    height: "2rem",
    borderBottom: isHovered ? "2px solid white" : "1px solid white",
    display: "flex",
    alignItems: "center",
  };

  const accountMenu = [
    { text: "Contact Us", icon: <CallIcon />, path: "/contact" },
    { text: "Logout", icon: <Logout />, path: "/login" },
  ];

  const handleLogout = () => {
    clearAllData();
    dispatch(logout());
    persistor.purge();
  };

  return (
    <div style={innerNav}>
      <div>
        <Link to={"/registration"}>
          <Tooltip title="click to get Register">
            <img
              src={logo}
              alt="LOGO"
              style={{
                height: "100%",
                width: "20%",
                scale: "0.8",
                marginLeft: "10rem",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Link>
      </div>

      <div style={navLeft}>
        <div style={{ marginRight: "5rem", marginLeft: "15rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <AccountCircleOutlinedIcon
                  style={{ color: "white" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: "#00111c",
                color: "white",
              },
            }}
          >
            {accountMenu.map((obj, index) => (
              <Link
                to={obj.path}
                key={index}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomMenuItem
                  onClick={() => {
                    obj.text === "Logout" ? handleLogout() : null;
                    handleClose();
                  }}
                  style={{ fontSize: "1rem", fontFamily: "cursive" }}
                >
                  <ListItemIcon sx={{ color: "white", fontSize: "1.5rem" }}>
                    {obj.icon}
                  </ListItemIcon>
                  {obj.text}
                </CustomMenuItem>
              </Link>
            ))}
          </Menu>
        </div>
        <div
          style={inputDivStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input type="text" placeholder="search..." style={inputStyle} />
        </div>
      </div>
    </div>
  );
}
