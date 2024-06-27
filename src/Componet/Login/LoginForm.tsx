import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { loginCss } from "./logincss";
import "./handleInputAuto.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userInfo } from "../../redux/Slice/loginSlice";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../commonFiles/commonComponents";
import { LoginDoneTick } from "../../Lottie/lottieComponent/LoginDoneTick";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSuccess = () => {
    setLoading(false);
    setLottie(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handlelogIn = async (e: { preventDefault: () => void }) => {
    if (!email && !password) {
      setIsRequired(true);
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await axios.get("http://localhost:3000/getUsersInfo");
      for (const user of userData.data) {
        if (user.username === email) {
          if (user.password === password) {
            dispatch(userInfo({ user }));
            setTimeout(() => {
              loginSuccess();
            }, 3000);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      setFetchError(true);
      console.log("Found error ", error);
    }
  };

  const placeholderColor = isRequired ? "red" : "transparent";

  const inputStyle = {
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    padding: "5%",
    fontFamily: "cursive",
  };
  const inputStyleConditional = {
    ...inputStyle,
    "::placeholder": {
      color: "red",
    },
  };

  return (
    <div style={loginCss.outerDiv}>
      <div style={loginCss.innerDiv}>
        <div style={{ height: "100%", width: "100%" }}>
          <span style={loginCss.textStyle}>Login Here</span>
          <div style={loginCss.inputOuterDiv}>
            <div style={loginCss.inputDiv}>
              <input
                data-testid="username"
                style={isRequired ? inputStyleConditional : inputStyle}
                type="text"
                id="username"
                placeholder={
                  isRequired ? "Username Required" : "Enter Username"
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
            </div>
            <div style={loginCss.inputDiv}>
              <input
                data-testid="password"
                style={isRequired ? inputStyleConditional : inputStyle}
                type="password"
                id="pass"
                placeholder={
                  isRequired ? "Password Required" : "Enter Password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
            </div>
          </div>
          {correctUser && (
            <span
              style={{
                color: "red",
                marginLeft: "5rem",
                fontWeight: "800",
                fontFamily: "cursive",
              }}
            >
              Incorrect email or password
            </span>
          )}
          <div style={loginCss.buttonDiv}>
            {loading ? (
              <CircularProgress />
            ) : fetchError ? (
              <span
                style={{
                  color: "white",
                  fontWeight: "400",
                  fontFamily: "cursive",
                }}
              >
                Something Went Wrong... Please try again later
              </span>
            ) : lottie ? (
              <div style={{ marginTop: "2rem" }}>
                <LoginDoneTick />
              </div>
            ) : (
              <SendButton
                operationOnData={handlelogIn}
                style={{ height: "8%", width: "25%", borderRadius: "10px" }}
                text="Login"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
