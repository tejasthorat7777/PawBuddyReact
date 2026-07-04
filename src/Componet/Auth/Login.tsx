import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {loginCss } from "../../commonFiles/commonTheme";
import logoImg from "../../assets/logo.png";
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
          setLoading(false);
          setLottie(true);
          setTimeout(() => navigate("/"), 1000);
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
    <div style={{ ...loginCss.outerDiv, padding: 40, boxSizing: "border-box" }}>
      <div style={{ width: "min(1200px,90%)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40 }}>
        <div style={{ flex: 1, color: "#fff", paddingLeft: 60 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoImg} alt="PawBuddy" style={{ height: 100, width: 200 }} />
        </div>

        <div style={{ marginTop: 80 }}>
          <div style={{ color: "#ffb703", fontWeight: 700, letterSpacing: 2 }}>WELCOME BACK</div>
          <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: "12px 0", color: "#fff" }}>
            Good boys deserve <span style={{ color: "#ffb703", fontStyle: "italic" }}>great</span> things.
          </h1>
          <p style={{ color: "#d1d1d1", maxWidth: 520 }}>Sign in to track orders, save favorites, and unlock member-only treats for your best friend.</p>
        </div>
        </div>

      <div style={{ width: 420 }}>
          <div style={{ background: "#fff6f0", borderRadius: 18, padding: 28, boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }}>
          <h2 style={{ margin: 0, color: "#2b2b2b" }}>Sign in</h2>
          <div style={{ marginTop: 8, color: "#8b6f61" }}>New here? <Link to="/auth/register" style={{ color: "#ff7f50", textDecoration: "none" }}>Create an account</Link></div>

          <div style={{ marginTop: 18 }}>
            <label style={{ fontSize: 12, color: "#8b6f61" }}>EMAIL</label>
            <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
              <input
                data-testid="userName"
                className={isRequired ? "red-placeholder" : ""}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "none", fontSize: 14, background: "#07121a", color: "#e6eef3" }}
                type="text"
                id="userName"
                placeholder={isRequired ? "* Email Required" : "you@pawbuddy.com"}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setCorrectUser(false);
                  setIsRequired(false);
                }}
              />
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 12, color: "#8b6f61" }}>PASSWORD</label>
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                <input
                  data-testid="password"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "none", fontSize: 14, background: "#07121a", color: "#e6eef3" }}
                  className={isRequired ? "red-placeholder" : ""}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={isRequired ? "* Password Required" : "Enter your password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setCorrectUser(false);
                    setIsRequired(false);
                  }}
                />
                <IconButton onClick={handleVerifyButton} data-testid="verify" id="verify" sx={{ marginLeft: 1 }}>
                  <VisibilityIcon sx={{ color: "#8b6f61" }} />
                </IconButton>
              </div>
            </div>

            {correctUser && (
              <div style={{ marginTop: 12 }}>
                <span style={{ color: "red", fontWeight: 700 }}>Incorrect email or password</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" /> <span style={{ color: "#8b6f61" }}>Keep me signed in</span>
              </label>
              <Link to="#" style={{ color: "#ff7f50", textDecoration: "none" }}>Forgot password?</Link>
            </div>

            <div style={{ marginTop: 18 }}>
              {loading ? (
                <CircularProgress />
              ) : lottie ? (
                <div style={{ marginTop: "2rem" }} data-testid="loginDoneTick">
                  <LoginDoneTick />
                </div>
                ) : (
                <SendButton
                  operationOnData={handlelogIn}
                  style={{ height: 44, width: "100%", borderRadius: "10px", backgroundColor: "#ff7f50", background: "linear-gradient(90deg,#ff7f50,#ffb366)", color: "white", border: "none" }}
                  text="Sign in"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
