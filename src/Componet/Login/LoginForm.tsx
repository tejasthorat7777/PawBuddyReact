import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { h100w100, loginCss } from "../../commonFiles/commonTheme";
import "../../commonFiles/commonCss/handleInputAuto.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userInfo } from "../../redux/Slice/Slices";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../commonFiles/SendButton";
import { LoginDoneTick } from "../../Lottie/lottieComponent/LoginDoneTick";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { apiUrl } from "../../commonFiles/commonFunctions";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSuccess = () => {
    setTimeout(() => {
      setLoading(false);
      setLottie(true);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleVerifyButton = () => {
    setShowPassword(!showPassword);
  };

  const reset = () => {
    setPassword("");
    setUserName("");
  };

  const getUser = async (userName: string) => {
    const getData = await axios.get(`${apiUrl}/api/getUsersInfo/${userName}`);
    return getData.data;
  };

  const handlelogIn = async (e: { preventDefault: () => void }) => {
    if (!userName || !password) {
      setIsRequired(true);
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const user = await getUser(userName);
      if (user.password === password) {
        dispatch(userInfo({ user }));
        setTimeout(() => {
          loginSuccess();
        }, 3000);
      } else {
        setPassword("");
        setCorrectUser(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("catch>>>>>", error);
      setLoading(false);
      setCorrectUser(true);
      reset();
    }
  };

  return (
    <div style={loginCss.outerDiv}>
      <div style={loginCss.innerDiv}>
        <div style={h100w100}>
          <span style={loginCss.textStyle}>Login Here</span>
          <div style={loginCss.inputOuterDiv}>
            <div style={loginCss.inputDiv}>
              <input
                data-testid="userName"
                className={isRequired ? "red-placeholder" : ""}
                style={loginCss.inputStyle}
                type="text"
                id="userName"
                placeholder={isRequired ? "* Email Required" : "Enter userName"}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value.trim());
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
            </div>
            <div style={loginCss.inputDiv}>
              <input
                data-testid="password"
                style={loginCss.inputStyle}
                className={isRequired ? "red-placeholder" : ""}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={
                  isRequired ? "* Password Required" : "Enter Password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
              <IconButton
                onClick={handleVerifyButton}
                data-testid="verify"
                id="verify"
              >
                <VisibilityIcon sx={{ color: "white", marginRight: "1rem" }} />
              </IconButton>
            </div>
          </div>
          {correctUser && (
            <span
              style={{
                color: "red",
                marginLeft: "6rem",
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
            ) : lottie ? (
              <div style={{ marginTop: "2rem" }} data-testid="loginDoneTick">
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
