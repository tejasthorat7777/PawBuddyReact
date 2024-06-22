import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { loginCss } from "./logincss";
import "./handleInputAuto.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/Slice/loginSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onHover, setOnHover] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handlelogIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = (await axios.get("http://localhost:3000/getUsersInfo"))
        .data;
      for (const user of userData) {
        if (user.username === email) {
          if (user.password === password) {
            console.log("userLog", user);
            dispatch(login({ user }));
            setTimeout(() => {
              window.location.href = "/";
            }, 0);
            return;
          }
        } else {
          setCorrectUser(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Found error ", error);
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
                style={loginCss.inputStyle}
                type="text"
                id="username"
                placeholder="Enter Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={loginCss.inputDiv}>
              <input
                style={loginCss.inputStyle}
                type="password"
                id="pass"
                placeholder="Enter password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Incorrect email and password
            </span>
          )}
          <div style={loginCss.buttonDiv}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: onHover ? "#597081" : "#00111c",
                  fontFamily: "cursive",
                  height: "100%",
                  width: "95%",
                  borderRadius: "10px",
                }}
                onClick={handlelogIn}
                onMouseEnter={() => {
                  setOnHover(true);
                }}
                onMouseLeave={() => {
                  setOnHover(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
