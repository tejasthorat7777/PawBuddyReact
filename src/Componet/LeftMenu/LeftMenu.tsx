import React from "react";
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
import { useState } from "react";
import {
  CustomButton,
  CustomAccordionSummary,
  CustomAccordionDetails,
  CustomAccordion,
} from "../../commonFiles/commonTheme";
import { ProfileType } from "../../commonFiles/commonTypes";

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

interface LeftProps {
  onPage: (pageName: ProfileType) => void;
}

interface MenuItem {
  header: string;
  image: string;
  key: string;
}

interface SubMenuItem {
  subHeader: string;
  subImage: string;
}

export default function LeftMenu({ onPage }: LeftProps) {
  const [isExpanded, setIsExpanded] = React.useState(null);

  const version = "0.0.1";

  const handleChange = (panel) => {
    setIsExpanded(isExpanded === panel ? null : panel);
  };

  const menu: MenuItem[] = [
    { header: "Dog Food", image: foodIcon, key: "dog_food" },
    { header: "Accessories", image: accessories, key: "accessories" },
    { header: "Shampoo", image: shampoo, key: "shampoo" },
    { header: "Bathroom Basics", image: poop, key: "bathroom_basics" },
  ];

  const subMenu: { [key: string]: SubMenuItem[] } = {
    dog_food: [
      { subHeader: "Dry Food", subImage: dryfood },
      { subHeader: "Gravy", subImage: gravyfood },
      { subHeader: "Treats", subImage: dogtreat },
    ],
    accessories: [
      { subHeader: "Leash", subImage: leash },
      { subHeader: "Harness", subImage: harness },
      { subHeader: "Collar", subImage: collar },
    ],
    shampoo: [
      { subHeader: "Shining Shampoo", subImage: shiningShampoo },
      { subHeader: "Tick and flea Shampoo", subImage: tickAndFleaShampoo },
      { subHeader: "scented Shampoo", subImage: shampooSented },
    ],
    bathroom_basics: [
      { subHeader: "Toilet Spray", subImage: spray },
      { subHeader: "Waste Scooper", subImage: scooper },
      { subHeader: "Fragnance Perfume", subImage: perfume },
    ],
  };

  return (
    <div
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
        <CustomButton
          onClick={() => {
            onPage("/");
          }}
        >
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

        {menu.map((menuItem, index) => (
          <CustomAccordion
            key={index}
            expanded={isExpanded === menuItem.key}
            onClick={() => handleChange(menuItem.key)}
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
            {subMenu[menuItem.key].map((subMenuItem, subIndex) => (
              <CustomAccordionDetails key={subIndex}>
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
              </CustomAccordionDetails>
            ))}
          </CustomAccordion>
        ))}
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
