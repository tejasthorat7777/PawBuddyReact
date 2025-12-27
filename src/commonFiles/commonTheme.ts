import {
  Button,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  MenuItem,
  styled,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import loginImage from "../assets/login.jpg";

export const h100w100 = { height: "100%", width: "100%" };

export const CustomTableColumn = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#181a22",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    textAlign: "center",
  },
}));
export const CustomTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#e9ecef",
  },
  "&:hover": {
    backgroundColor: "#ced4da",
  },
}));

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

export const universalDiv = {
  ...h100w100,
  ...flexDiv,
};

export const redAlert = {
  color: "#ff6b6b",
  paddingTop: "5px",
  paddingLeft: "5px",
};

export const loginCss = {
  outerDiv: {
    ...flexDiv,
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${loginImage})`,
  },

  innerDiv: {
    height: "65%",
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
    // height: "20%",
    // marginTop: "2%",
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
    caretColor: "#ffffff",
  },

  inputOuterDiv: {
    width: "100%",
    padding: "5%",
    margin: "2% 0",
  },
};

export const homeStyle = {
  IconButton: {
    color: "white",
    minWidth: 0,
    padding: 8,
  },

  PaginationDiv: {
    width: "22%",
    marginTop: "1%",
    marginRight: "5%",
  },

  outerDiv: {
    width: "100%",
    backgroundColor: "#597081",
    padding: "16px",
    minHeight: "92vh",
  },

  commonDiv: {
    display: "flex",
    height: "17rem",
    justifyContent: "space-evenly",
  },

  cardContent: {
    height: "auto",
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
    fontSize: "65%",
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
  uploadBtn: {
    borderRadius: "10px",
    ...h100w100,
  },
  productBrand: {
    width: "45%",
    backgroundColor: "white",
    height: "10%",
    marginTop: "5%",
    color: "black",
    marginRight: "5%",
    borderRadius: "5px",
  },
  prodName: {
    width: "100%",
    backgroundColor: "white",
    height: "10%",
    color: "black",
    borderRadius: "5px",
  },
  prodDiscrip: {
    marginTop: "3%",
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    padding: "2%",
    fontFamily: "cursive",
    borderRadius: "5px",
    color: "black",
  },
  prodPriceQuantWeight: {
    width: "45%",
    backgroundColor: "white",
    height: "10%",
    marginTop: "3%",
    color: "black",
    borderRadius: "5px",
  },
  finalPrice: {
    backgroundColor: "white",
    width: "50%",
    marginLeft: "20%",
    padding: "2%",
    marginTop: "3%",
    borderRadius: "5px",
    fontFamily: "cursive",
  },
};

export const ordersCss = {
  orderOuter: {
    width: "90%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    marginLeft: "5%",
    marginBottom: "5%",
    borderRadius: "10px",
  },
  dateAndOrderIdOuter: {
    width: "100%",
    height: "20%",
    backgroundColor: "#bac5cb",
    borderRadius: "10px 10px 0rem 0rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePriceAndShip: {
    width: "50%",
    height: "100%",
    padding: "2%",
    ...flexDiv,
    justifyContent: "space-evenly",
  },
  orderId: {
    width: "50%",
    height: "100%",
    ...flexDiv,
    justifyContent: "flex-end",
    padding: "2%",
  },
  textCss: {
    fontSize: "14px",
    fontFamily: "cursive",
  },
  downDiv: {
    height: "80%",
    width: "100%",
    ...flexDiv,
    justifyContent: "flex-start",
  },
  imageDiv: {
    height: "100%",
    width: "30%",
    padding: "3%",
  },
  discriptionDiv: {
    height: "100%",
    width: "60%",
    padding: "2%",
    fontFamily: "cursive",
    fontSize: "16px",
  },
  buttons: {
    height: "100%",
    width: "25%",
    padding: "2%",
  },
};
