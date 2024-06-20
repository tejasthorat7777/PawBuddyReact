import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./Componet/Registration/Registration.js";
import Template from "./RenderAutomation/Template.js";
import { useLocation } from "react-router-dom";
import LoginForm from "./Componet/Login/LoginForm.js";

function App() {
  const location = useLocation();
  const [regi, setRegi] = useState(location.pathname.includes("registration"));
  const [login, setLogin] = useState(location.pathname.includes("login"));

  useEffect(() => {
    setRegi(location.pathname.includes("registration"));
    setLogin(location.pathname.includes("login"));
  }, [location]);

  return <>{regi ? <Registration /> : login ? <LoginForm /> : <Template />}</>;
}

export default App;
