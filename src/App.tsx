import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./Componet/Registration/Registration.js";
import Template from "./RenderAutomation/Template.js";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./Componet/Login/LoginForm.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [regi, setRegi] = useState(location.pathname.includes("registration"));
  const [login, setLogin] = useState(location.pathname.includes("login"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Assume user is authenticated if token exists
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Update the registration and login state based on URL
  useEffect(() => {
    setRegi(location.pathname.includes("registration"));
    setLogin(location.pathname.includes("login"));
  }, [location]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !login && !regi) {
      navigate("/login");
    }
  }, [isAuthenticated, login, regi, navigate]);

  return (
    <>
      {regi ? (
        <Registration />
      ) : login ? (
        <LoginForm />
      ) : isAuthenticated ? (
        <Template />
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default App;
