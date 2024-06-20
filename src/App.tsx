import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./Componet/Registration/Registration.js";
import Template from "./RenderAutomation/Template.js";
import { useLocation } from "react-router-dom";
import Login from "./Componet/Login/LoginForm.js"
import LoginForm from "./Componet/Login/LoginForm.js";

function App() {
  const location = useLocation();
  const [regi, setRegi] = useState(location.pathname.includes("registration"));

  useEffect(() => {
    setRegi(location.pathname.includes("registration"));
  }, [location]);

  return <>{regi ? <Registration /> : <LoginForm />}</>;
}

export default App;
