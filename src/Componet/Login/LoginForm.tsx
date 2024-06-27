import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { loginCss } from "./logincss";
import "./handleInputAuto.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userInfo } from "../../redux/Slice/loginSlice";
import { useNavigate } from "react-router-dom";
import { SendButton } from "../../commonFiles/commonComponents";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await axios.get("http://localhost:3000/getUsersInfo");
      for (const user of userData.data) {
        if (user.username === email) {
          if (user.password === password) {
            dispatch(userInfo({ user }));
            setTimeout(() => {
              navigate("/");
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
      setFetchError(true);
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
                data-testid="username"
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
                data-testid="password"
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
            ) : (
              <SendButton
                operationOnData={handlelogIn}
                email={email != "" ? true : false}
                password={password != "" ? true : false}
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
