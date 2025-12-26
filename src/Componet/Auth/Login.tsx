import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { h100w100, loginCss } from "../../commonFiles/commonTheme";
import "../../commonFiles/commonCss/handleInputAuto.css";
import { SendButton } from "../../commonFiles/SendButton";
import { LoginDoneTick } from "../../Lottie/lottieComponent/LoginDoneTick";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);

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

  const handlelogIn = async (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!username || !password) {
      setIsRequired(true);
      return;
    }

    setLoading(true);
    setCorrectUser(false);

    try {
      const success = await login({ username, password });

      if (success) {
        // Wait a bit to show the loading spinner before showing lottie
        setTimeout(() => {
          loginSuccess();
        }, 1000);
      } else {
        setLoading(false);
        setCorrectUser(true);
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      setCorrectUser(true);
      setPassword("");
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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
            {correctUser && (
              <div
                style={{
                  height: "2rem",
                }}
              >
                <span
                  style={{
                    color: "red",
                    fontWeight: "800",
                    fontFamily: "cursive",
                    marginLeft: "5rem",
                  }}
                >
                  Incorrect email or password
                </span>
              </div>
            )}
          </div>

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
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              color: "wheat",
              fontFamily: "cursive",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              style={{
                color: "#ffd700",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
