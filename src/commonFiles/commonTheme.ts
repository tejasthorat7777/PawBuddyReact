import styled from "@emotion/styled";
import {
  Button,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  MenuItem,
} from "@mui/material";

export const CustomButton = styled(Button)({
  width: "100%",
  height: "8%",
  color: "white",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#003049",
  },
});

export const CustomMenuItem = styled(MenuItem)({
  color: "white",
  fontFamily: "cursive",
  "&:hover": {
    backgroundColor: "#003049",
  },
});

export const CustomAccordionSummary = styled(AccordionSummary)({
  borderRadius: "5px 5px 0px 0px",
  "&:hover": {
    backgroundColor: "#003049",
  },
  "&.Mui-expanded": {
    backgroundColor: "#597081",
    color: "black",
  },
});

export const CustomAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#597081",
  padding: "0",
});

export const CustomAccordion = styled(Accordion)({
  backgroundColor: "#00111c",
  boxShadow: "none",
  color: "white",
});

export const commonStyleDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#00111C",
  color: "white",
};

export const flexDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const linkStyle = {
  textDecoration: "none",
  color: "white",
};
