import logo from "../../assets/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, IconButton, ListItemIcon, Menu, Tooltip } from "@mui/material";
import { CustomMenuItem } from "../../commonFiles/commonTheme";
import { Login, Logout } from "@mui/icons-material";
import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreIcon from "@mui/icons-material/Store";
import { persistor, RootState } from "../../redux/store/store";
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

export default function NavbarCust() {
  const user = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();
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
    width: "10rem",
    height: "2rem",
    borderBottom: isHovered ? "2px solid white" : "1px solid white",
    display: "flex",
    alignItems: "center",
  };

  const accountMenu = [
    {
      text: "Profile",
      icon: <PersonOutlineOutlinedIcon />,
      path: "/account/profile",
    },
    {
      text: "WishList",
      icon: <FavoriteBorderOutlinedIcon />,
      path: "/account/whishlist",
    },
    { text: "Orders", icon: <AddShoppingCartIcon />, path: "/account/orders" },
    { text: "Contact Us", icon: <CallIcon />, path: "/contact" },
    { text: "Business Login", icon: <StoreIcon />, path: "/businesslogin" },
    user != ""
      ? { text: "Logout", icon: <Logout />, path: "/login" }
      : { text: "Log-In", icon: <Login />, path: "/login" },
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
            <Tooltip title="Shopping Cart">
              <Link to={"/cart"} key={"Cart"}>
                <IconButton data-testid={"shoppingCart"} id={"shoppingCart"}>
                  <ShoppingCartOutlinedIcon
                    style={{ color: "white" }}
                    sx={{ fontSize: 30 }}
                  />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                id="acc_menu"
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
                  id={`account_${obj.text}`}
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
