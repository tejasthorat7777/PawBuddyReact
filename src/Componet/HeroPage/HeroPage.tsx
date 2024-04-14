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

export default function HeroPage() {
  const CustomButton = styled(Button)({
    width: "100%",
    height: "8%",
    color: "white",
    "&:hover": {
      backgroundColor: "#003049",
    },
  });

  const CustomAccordionSummary = styled(AccordionSummary)({
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#00111c",
    "&:hover": {
      backgroundColor: "#003049",
    },
    "&.Mui-expanded": {
      backgroundColor: "#597081",
      color: "black",
    },
  });

  const CustomAccordionDetails = styled(AccordionDetails)({
    backgroundColor: "#597081", // Change this to the desired grey color
    padding: "0", // Add padding for better spacing
  });

  const CustomAccordion = styled(Accordion)({
    backgroundColor: "#00111c",
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

          <CustomAccordion>
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
            <CustomAccordionDetails style={{ borderRadius: "0px 0px 5px 5px" }}>
              <CustomButton>
                <div style={customButtonContainer}>
                  <img
                    src={gravyfood}
                    alt="Food Icon"
                    style={{
                      height: "1.6em",
                      margin: "0% 3% 1% 5%",
                    }}
                  />
                  Gravy
                </div>
              </CustomButton>
            </CustomAccordionDetails>
          </CustomAccordion>
        </Container>
      </div>
    </>
  );
}
