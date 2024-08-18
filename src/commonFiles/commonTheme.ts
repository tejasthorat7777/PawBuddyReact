import {
  Button,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  MenuItem,
  styled,
} from "@mui/material";
import loginImage from "../assets/login.jpg";

export const h100w100 = { height: "100%", width: "100%" };

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

export const flexDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const commonStyleDiv = {
  ...flexDiv,
  height: "100vh",
  backgroundColor: "#00111C",
  color: "white",
};

export const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export const loginCss = {
  outerDiv: {
    ...flexDiv,
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${loginImage})`,
  },

  innerDiv: {
    height: "55%",
    width: "30%",
    borderRadius: "20px",
    padding: "1%",
    backgroundColor: "#343a40",
  },

  textStyle: {
    ...flexDiv,
    fontFamily: "cursive",
    fontSize: "45px",
    fontWeight: "800",
    color: "#ced4da",
  },

  buttonDiv: {
    ...flexDiv,
    width: "100%",
    height: "20%",
    marginTop: "2%",
    padding: "2%",
    borderRadius: "10px",
  },

  inputDiv: {
    height: "50%",
    width: "100%",
    marginBottom: "5%",
    display: "flex",
    borderRadius: "10px",
    backgroundColor: "#00111c",
  },

  inputStyle: {
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    padding: "5%",
    fontFamily: "cursive",
    backgroundColor: "transparent",
  },

  inputOuterDiv: {
    height: "50%",
    width: "100%",
    padding: "5%",
    margin: "2% 0",
  },
};

export const homeStyle = {
  IconButton: {
    color: "white",
  },

  PaginationDiv: {
    width: "22%",
    marginTop: "1%",
    marginRight: "5%",
  },

  outerDiv: {
    height: "100%",
    width: "100%",
    backgroundColor: "#597081",
    padding: "2%",
  },

  commonDiv: {
    display: "flex",
    height: "17rem",
    justifyContent: "space-evenly",
  },

  cardContent: {
    height: "5%",
    backgroundColor: "#00111c",
    color: "white",
    ...flexDiv,
    justifyContent: "space-between",
  },

  cardMedia: {
    height: "100%",
    objectFit: "cover",
    ...flexDiv,
  },
};

export const cartStyle = {
  cardAction: {
    height: "12rem",
    ...flexDiv,
  },
  cardMedia: {
    height: "11rem",
    objectFit: "cover",
  },
  IconButton: {
    color: "white",
    fontSize: "60%",
    backgroundColor: "grey",
    fontWeight: "400",
    padding: "2%",
  },
  cardStyle: {
    width: "75%",
    marginTop: "1%",
  },
  priceText: {
    fontSize: "25px",
    color: "white",
    marginTop: "2%",
  },
  imageStyle: { height: "100%", width: "auto" },
};

export const businessAddproduct = {
  outerDiv: {
    backgroundColor: "#00111c",
    height: "80%",
    padding: "2%",
    marginTop: "2%",
    display: "flex",
    justifyContent: "space-between",
  },
  imgOuter: {
    height: "65%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  h100w100: { height: "100%", width: "100%" },
  uploadBtnDiv: {
    ...flexDiv,
    ...h100w100,
  },
  uploadBtn:{
    borderRadius: "10px",
    ...h100w100
  },
  productBrand:{
    width: "45%",
    backgroundColor: "white",
    height: "10%",
    marginTop: "5%",
    color: "black",
    marginRight: "5%",
    borderRadius: "5px",
  },
  prodName:{
    width: "100%",
    backgroundColor: "white",
    height: "10%",
    color: "black",
    borderRadius: "5px",
  },
  prodDiscrip:{
    marginTop: "3%",
    height: "40%",
    width: "100%",
    backgroundColor: "white",
    padding: "2%",
    fontFamily: "cursive",
    borderRadius: "5px",
  },
  prodPriceQuantWeight:{
    width: "45%",
    backgroundColor: "white",
    height: "10%",
    marginTop: "3%",
    color: "black",
    borderRadius: "5px",
  }
};
