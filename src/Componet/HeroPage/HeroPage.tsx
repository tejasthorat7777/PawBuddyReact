import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Navbar from "../Navbar/Navbar";
import homeIcon from "../../assets/home.png";
import foodIcon from "../../assets/pet-food.png";
import { styled } from "@mui/material/styles";
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
import { useState } from "react";

const CustomButton = styled(Button)({
  width: "100%",
  height: "8%",
  color: "white",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#003049",
  },
});

const CustomAccordionSummary = styled(AccordionSummary)({
  borderRadius: "5px 5px 0px 0px",
  "&:hover": {
    backgroundColor: "#003049",
  },
  "&.Mui-expanded": {
    backgroundColor: "#597081",
    color: "black",
  },
});

const CustomAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#597081",
  padding: "0",
});

const CustomAccordion = styled(Accordion)({
  backgroundColor: "#00111c",
  boxShadow: "none",
  color: "white",
});

const customButtonContainer = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  fontFamily: "cursive",
  color: "white",
};

const leftNavigation = {
  backgroundColor: "#00111c",
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  width: "17vw",
  marginLeft: "0%",
  height: "92vh",
  color: "white",
  padding: "0",
};

export default function HeroPage() {
  const [isExpanded, setIsExpanded] = useState("");

  const handlChange = (panel: string) => {
    setIsExpanded((prevState) => (prevState === panel ? "" : panel));
  };

  return (
    <>
      <Navbar />
      <div style={leftNavigation}>
        <Container
          style={{
            height: "100%",
            width: "100%",
            padding: "0",
            marginTop: "2%",
          }}
        >
          <CustomButton>
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

          <CustomAccordion
            expanded={isExpanded === "panel1"}
            onClick={() => {
              handlChange("panel1");
            }}
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
                  src={foodIcon}
                  alt="Food Icon"
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 1%",
                  }}
                />
                Dog Food
              </div>
            </CustomAccordionSummary>
            <div onClick={(e) => e.stopPropagation()}>
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={dryfood}
                      alt="Food Icon"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Dry Food
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={gravyfood}
                      alt="gravyfood"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Gravy
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails
                style={{ borderRadius: "0px 0px 5px 5px" }}
              >
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={dogtreat}
                      alt="dogtreat"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Treats
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
            </div>
          </CustomAccordion>
          <CustomAccordion
            expanded={isExpanded === "panal2"}
            onClick={() => {
              handlChange("panal2");
            }}
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
                  src={accessories}
                  alt="Accessories"
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 1%",
                  }}
                />
                Accessories
              </div>
            </CustomAccordionSummary>
            <div onClick={(e) => e.stopPropagation()}>
              {" "}
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={leash}
                      alt="leash"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Leash
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={harness}
                      alt="harness"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Harness
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails
                style={{ borderRadius: "0px 0px 5px 5px" }}
              >
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={collar}
                      alt="Collar"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Collar
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
            </div>
          </CustomAccordion>
          <CustomAccordion
            expanded={isExpanded === "panel3"}
            onClick={() => {
              handlChange("panel3");
            }}
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
                  src={shampoo}
                  alt="Food Icon"
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 1%",
                  }}
                />
                Shampoo
              </div>
            </CustomAccordionSummary>
            <div onClick={(e) => e.stopPropagation()}>
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={shiningShampoo}
                      alt="Food Icon"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Shining Shampoo
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails>
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={tickAndFleaShampoo}
                      alt="gravyfood"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    Tick and flea Shampoo
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
              <CustomAccordionDetails
                style={{ borderRadius: "0px 0px 5px 5px" }}
              >
                <CustomButton>
                  <div style={customButtonContainer}>
                    <img
                      src={shampooSented}
                      alt="dogtreat"
                      style={{
                        height: "1.6em",
                        margin: "0% 3% 1% 5%",
                      }}
                    />
                    scented Shampoo
                  </div>
                </CustomButton>
              </CustomAccordionDetails>
            </div>
          </CustomAccordion>
        </Container>
      </div>
    </>
  );
}
