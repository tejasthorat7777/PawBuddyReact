import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { loginCss } from "../../commonFiles/commonTheme";
import "../../commonFiles/commonCss/handleInputAuto.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userInfo } from "../../redux/Slice/Slices";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../commonFiles/SendButton";
import { LoginDoneTick } from "../../Lottie/lottieComponent/LoginDoneTick";
import { UserData } from "../../commonFiles/commonTypes";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [userDataArray, setUserDataArray] = useState<UserData[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSuccess = () => {
    setLoading(false);
    setLottie(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleVerifyButton = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async () => {
    try {
      const getData = await axios.get("http://localhost:3000/getUsersInfo");
      const data = getData.data;
      setUserDataArray(data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlelogIn = async (e: { preventDefault: () => void }) => {
    if (!email || !password) {
      setIsRequired(true);
      return;
    }
    e.preventDefault();
    setLoading(true);
    const user = userDataArray.find(
      (user: UserData) => user.username === email
    );
    if (user) {
      if (user.password === password) {
        dispatch(userInfo({ user }));
        setTimeout(() => {
          loginSuccess();
        }, 3000);
      } else {
        setLoading(false);
        setCorrectUser(true);
      }
    } else {
      setLoading(false);
      setCorrectUser(true);
    }
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
                className={isRequired ? "red-placeholder" : ""}
                style={loginCss.inputStyle}
                type="text"
                id="username"
                placeholder={
                  isRequired ? "* Username Required" : "Enter Username"
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
                style={loginCss.inputStyle}
                className={isRequired ? "red-placeholder" : ""}
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder={
                  isRequired ? "* Password Required" : "Enter Password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
              <IconButton onClick={handleVerifyButton} data-testid="verify">
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
