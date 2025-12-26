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
import {
  CustomButton,
  CustomAccordionSummary,
  CustomAccordionDetails,
  CustomAccordion,
} from "../../commonFiles/commonTheme";
import { Link } from "react-router-dom";

const customButtonContainer = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  fontFamily: "cursive",
  color: "white",
};

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
        {menu.map((menuItem, index) => (
          <CustomAccordion
            key={index}
            expanded={isExpanded === menuItem.name}
            onClick={() => handleChange(menuItem.name)}
          >
            <CustomAccordionSummary
              expandIcon={
                <ArrowForwardIosSharpIcon
                  style={{ fontSize: "1rem", color: "white" }}
                />
              }
            >
              <div style={customButtonContainer}>
                <img
                  src={menuItem.image}
                  alt={`${menuItem.header} Icon`}
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 1%",
                  }}
                />
                {menuItem.header}
              </div>
            </CustomAccordionSummary>
            {subMenu[menuItem.name].map((subMenuItem, subIndex) => (
              <CustomAccordionDetails
                key={subIndex}
                style={{
                  borderRadius: subIndex === 2 ? "0px 0px 10px 10px" : "0px",
                }}
              >
                <Link to={subMenuItem.path}>
                  <CustomButton>
                    <div style={customButtonContainer}>
                      <img
                        src={subMenuItem.subImage}
                        alt={`${subMenuItem.subHeader} Icon`}
                        style={{
                          height: "1.6em",
                          margin: "0% 3% 1% 5%",
                        }}
                      />
                      {subMenuItem.subHeader}
                    </div>
                  </CustomButton>
                </Link>
              </CustomAccordionDetails>
            ))}
          </CustomAccordion>
        ))}
      </>
    );
  };

  const renderBusiness = () => {
    return (
      <>
        {businessMenu.map((obj, index) => (
          <Link to={obj.path} key={index}>
            <CustomButton>
              <div style={customButtonContainer}>
                <img
                  src={obj.image}
                  alt={`${obj.header} Icon`}
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 5%",
                  }}
                />
                {obj.header}
              </div>
            </CustomButton>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div
      className="left-menu-container"
      style={{
        backgroundColor: "#00111c",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        width: "17vw",
        marginLeft: "0%",
        height: "92vh",
        color: "white",
        padding: "0",
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
        <Link to={"/"}>
          <CustomButton id="homeBtn">
            <div style={customButtonContainer}>
              <img
                src={homeIcon}
                alt="Home Icon"
                style={{
                  height: "1.6em",
                  margin: "0% 2% 1% 6%",
                }}
              />
              Home
            </div>
          </CustomButton>
        </Link>
        {!business ? renderBusiness() : render()}
        <div style={flexCenter}>
          <div style={greyLine}></div>
        </div>
        <div style={Object.assign({}, flexCenter, greyText)}>
          © PawBuddy Version {version}
        </div>
      </Container>
    </div>
  );
}
