import { useState } from "react";
import { Button } from "@mui/material";

const disFlex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const outerDiv = {
  ...disFlex,
  height: "100vh",
  width: "100vw",
  backgroundColor: "#00111c",
};

const innerDiv = {
  height: "55%",
  width: "30%",
  borderRadius: "20px",
  padding: "2%",
  backgroundColor: "#284b63",
};

const textStyle = {
  ...disFlex,
  fontFamily: "cursive",
  fontSize: "45px",
  fontWeight: "800",
  color: "white",
};

const buttonDiv = {
  ...disFlex,
  width: "100%",
  height: "20%",
  marginTop: "5%",
  padding: "2%",
  borderRadius: "10px",
};

const inputStyle = {
  height: "100%",
  width: "100%",
  borderRadius: "10px",
  padding: "5%",
  fontFamily: "cursive",
};

const inputDiv = {
  height: "50%",
  width: "100%",
  marginBottom: "5%",
  borderRadius: "10px",
};

const inputOuterDiv = {
  height: "50%",
  width: "100%",
  padding: "5%",
  marginTop: "2%",
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onHover, setOnHover] = useState(false);

  const handlelogIn = (e: { preventDefault: () => void }) => {
    // TODO verify email and password with db if correct then store the userId in redux which is present in db,
    // in navbar on clicking account , if user is logged in then we will show log-out option otherwise there will be log-in option
    e.preventDefault();
  };

  return (
    <div style={outerDiv}>
      <div style={innerDiv}>
        <div style={{ height: "100%", width: "100%" }}>
          <span style={textStyle}>Login Here</span>
          <div style={inputOuterDiv}>
            <div style={inputDiv}>
              <input
                style={inputStyle}
                type="text"
                id="username"
                placeholder="Enter Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={inputDiv}>
              <input
                style={inputStyle}
                type="password"
                id="pass"
                placeholder="Enter password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div style={buttonDiv}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
