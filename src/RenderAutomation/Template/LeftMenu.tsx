import { Container } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import homeIcon from "../../assets/home.png";
import foodIcon from "../../assets/pet-food.png";
import gravyfood from "../../assets/poutine.png";
import dryfood from "../../assets/bones.png";
import dogtreat from "../../assets/dog-treat.png";
import accessories from "../../assets/dog.png";
import leash from "../../assets/leash.png";
import collar from "../../assets/collar.png";
import harness from "../../assets/harness.png";
import shampoo from "../../assets/pet-shampoo.png";
import shampooSented from "../../assets/sentedShampoo.png";
import shiningShampoo from "../../assets/ShiningShampoo.png";
import tickAndFleaShampoo from "../../assets/tickandFleaShampoo.png";
import perfume from "../../assets/perfume.png";
import poop from "../../assets/poop.png";
import scooper from "../../assets/poop-scooper.png";
import spray from "../../assets/spray.png";
import addProduct from "../../assets/add-product.png";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";


const flexCenter = {
  display: "flex",
  justifyContent: "center",
  marginTop: "5%",
  alignItems: "center",
};

const greyLine = {
  width: "95%",
  backgroundColor: "grey",
  height: "1px",
};

const greyText = {
  color: "grey",
  fontFamily: "cursive",
  fontSize: "12px",
};

interface MenuItem {
  header: string;
  image: string;
  name: string;
}

interface SubMenuItem {
  subHeader: string;
  subImage: string;
  path: string;
}

export default function LeftMenu() {
  const [isExpanded, setIsExpanded] = useState("");
  const [hovered, setHovered] = useState("");

  const location = useLocation();

  // Todo create a field in redux which state user using business account or not
  const business = true;

  const version = "0.0.1";

  const handleChange = (panel: string) => {
    setIsExpanded(isExpanded === panel ? "" : panel);
  };

  const menu: MenuItem[] = [
    { header: "Dog Food", image: foodIcon, name: "dog_food" },
    { header: "Accessories", image: accessories, name: "accessories" },
    { header: "Shampoo", image: shampoo, name: "shampoo" },
    { header: "Bathroom Basics", image: poop, name: "bathroom_basics" },
  ];

  const subMenu: { [name: string]: SubMenuItem[] } = {
    dog_food: [
      { subHeader: "Dry Food", subImage: dryfood, path: "/dogfood/dryfood" },
      { subHeader: "Gravy", subImage: gravyfood, path: "/dogfood/gravy" },
      { subHeader: "Treats", subImage: dogtreat, path: "/dogfood/treats" },
    ],
    accessories: [
      { subHeader: "Leash", subImage: leash, path: "/accessories/leash" },
      { subHeader: "Harness", subImage: harness, path: "/accessories/harness" },
      { subHeader: "Collar", subImage: collar, path: "/accessories/collar" },
    ],
    shampoo: [
      {
        subHeader: "Shining Shampoo",
        subImage: shiningShampoo,
        path: "/shampoo/shinigshampoo",
      },
      {
        subHeader: "Tick and flea Shampoo",
        subImage: tickAndFleaShampoo,
        path: "/shampoo/tickAndFleaShampoo",
      },
      {
        subHeader: "scented Shampoo",
        subImage: shampooSented,
        path: "/shampoo/shampooSented",
      },
    ],
    bathroom_basics: [
      { subHeader: "Toilet Spray", subImage: spray, path: "/bathroom/spray" },
      {
        subHeader: "Waste Scooper",
        subImage: scooper,
        path: "/bathroom/scooper",
      },
      {
        subHeader: "Fragnance Perfume",
        subImage: perfume,
        path: "/bathroom/perfume",
      },
    ],
  };

  const businessMenu = [
    {
      header: "Add Product",
      image: addProduct,
      name: "add_product",
      path: "/business/add_product",
    },
  ];

  const render = () => {
    return (
      <>
        {menu.map((menuItem, index) => {
          const expanded = isExpanded === menuItem.name;
          return (
            <div key={index} style={{ marginBottom: 12 }}>
                  <div
                    onClick={() => handleChange(menuItem.name)}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setHovered(menuItem.name)}
                    onMouseLeave={() => setHovered("")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: expanded
                        ? "linear-gradient(90deg,#ffb366,#ff7f50)"
                        : hovered === menuItem.name
                        ? "#fff4ea"
                        : "transparent",
                      color: expanded ? "white" : "#3b3b3b",
                      boxShadow: expanded ? "0 4px 14px rgba(255,127,80,0.18)" : "none",
                    }}
                  >
                <img
                  src={menuItem.image}
                  alt={`${menuItem.header} Icon`}
                  style={{ height: 28, width: 28, marginRight: 12, opacity: expanded ? 1 : 0.9 }}
                />
                <div style={{ fontWeight: 700 }}>{menuItem.header}</div>
                <div style={{ marginLeft: "auto", opacity: 0.75 }}>
                  <ArrowForwardIosSharpIcon style={{ fontSize: "0.9rem", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", color: expanded ? "white" : "#b0b0b0" }} />
                </div>
              </div>

              {expanded && (
                <div style={{ marginTop: 8, paddingLeft: 10 }}>
                  {subMenu[menuItem.name].map((subMenuItem, subIndex) => (
                    <Link to={subMenuItem.path} key={subIndex} style={{ textDecoration: "none" }}>
                      <div
                        onMouseEnter={() => setHovered(subMenuItem.subHeader)}
                        onMouseLeave={() => setHovered("")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 12px",
                          borderRadius: 8,
                          background: hovered === subMenuItem.subHeader ? "#fff4ea" : "transparent",
                          color: "#3b3b3b",
                          marginBottom: 8,
                          boxShadow: hovered === subMenuItem.subHeader ? "0 2px 8px rgba(11,11,11,0.04)" : "none",
                        }}
                      >
                        <img
                          src={subMenuItem.subImage}
                          alt={`${subMenuItem.subHeader} Icon`}
                          style={{ height: 24, width: 24, marginRight: 12 }}
                        />
                        <div style={{ fontWeight: 600 }}>{subMenuItem.subHeader}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const renderBusiness = () => {
    return (
      <>
        {businessMenu.map((obj, index) => (
          <Link to={obj.path} key={index} style={{ textDecoration: "none" }}>
            <div
              onMouseEnter={() => setHovered(obj.header)}
              onMouseLeave={() => setHovered("")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 8,
                color: "#3b3b3b",
                cursor: "pointer",
                background: hovered === obj.header ? "#fff4ea" : "transparent",
              }}
            >
              <img src={obj.image} alt={`${obj.header} Icon`} style={{ height: 24, width: 24, marginRight: 12 }} />
              <div style={{ fontWeight: 600 }}>{obj.header}</div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  // determine active route for highlighting
  const activePath = location.pathname || "/";

  return (
    <div
      className="left-menu-container"
      style={{
        backgroundColor:"#fffbf5",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        width: "17vw",
        marginLeft: "0%",
        height: "92vh",
        color: "#2b2b2b",
        padding: "20px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Container
        style={{
          height: "100%",
          width: "100%",
          padding: "0",
          marginTop: "2%",
        }}
      >
        <div style={{ background: "white", padding: 18, borderRadius: 14, boxShadow: "none" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              onMouseEnter={() => setHovered("Home")}
              onMouseLeave={() => setHovered("")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 10,
                background: activePath === "/" ? "linear-gradient(90deg,#ffb366,#ff7f50)" : hovered === "Home" ? "#fff4ea" : "transparent",
                color: activePath === "/" ? "white" : "#3b3b3b",
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              <img src={homeIcon} alt="Home Icon" style={{ height: 28, width: 28, marginRight: 12 }} />
              <div style={{ fontWeight: 800 }}>Home</div>
              <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 8, background: activePath === "/" ? "#fff" : "transparent" }} />
            </div>
          </Link>

          <div style={{ marginTop: 6 }}>{!business ? renderBusiness() : render()}</div>

          {/* divider removed to keep left menu visually inline with product area */}

          {/* Paw points removed as requested */}
        </div>
        <div style={Object.assign({}, flexCenter, greyText, { marginTop: 14 })}>
          © PawBuddy Version {version}
        </div>
      </Container>
    </div>
  );
}
