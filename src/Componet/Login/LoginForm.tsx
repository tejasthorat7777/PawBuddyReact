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
      const apiUrl = import.meta.env.VITE_API_URL;
      const getData = await axios.get(`${apiUrl}/getUsersInfo`);
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
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/login`, {
        username: email,
        password,
      });

      // If login is successful, the token will be returned
      const token = response.data.token;
      const user = response.data.user;

      // Store token in localStorage for persistence
      localStorage.setItem("token", token);

      // Optionally, dispatch user info to Redux state
      dispatch(userInfo({ user }));

      // Handle successful login
      loginSuccess();
    } catch (error) {
      setLoading(false);
      setCorrectUser(true); // Show error message if credentials are incorrect
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
                id="password"
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
