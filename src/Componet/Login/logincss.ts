import { flexDiv } from "../../commonFiles/commonTheme";
import loginImage from "../../assets/login.jpg";

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
    backgroundColor: "#00111c"
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
