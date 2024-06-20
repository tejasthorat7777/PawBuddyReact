import logo from "../../assets/logo.png";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, IconButton, ListItemIcon, Menu, Tooltip } from "@mui/material";
import { CustomMenuItem } from "../../commonFiles/commonTheme";
import { Logout, Settings } from "@mui/icons-material";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  color: "white",
  outline: "0",
  border: "none",
};

const innerNav = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const navLeft = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "100%",
  paddingLeft: "1rem",
  justifyContent: "flex-end",
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
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
    width: "15%",
    height: "50%",
    borderBottom: isHovered ? "2px solid white" : "1px solid white",
    display: "flex",
    alignItems: "center",
  };

  const accountMenu = [
    {
      text: "Profile",
      component: <PersonOutlineOutlinedIcon />,
      path: "/account/profile",
    },
    {
      text: "WishList",
      component: <FavoriteBorderOutlinedIcon />,
      path: "/whishlist",
    },
    { text: "Orders", component: <AddShoppingCartIcon />, path: "/orders" },
    { text: "Contact Us", component: <CallIcon />, path: "/contact" },
    { text: "Settings", component: <Settings />, path: "/setting" },
    { text: "Logout", component: <Logout />, path: "/home" },
  ];

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
      <div style={innerNav}>
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

        <div style={navLeft}>
          <div style={{ marginRight: "5%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
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
                      handleClose();
                    }}
                    style={{ fontSize: "1rem", fontFamily: "cursive" }}
                  >
                    <ListItemIcon sx={{ color: "white", fontSize: "1.5rem" }}>
                      {obj.component}
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
    </div>
  );
}
