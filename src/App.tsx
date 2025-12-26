import { useEffect, useState } from "react";
import "./App.css";
import Template from "./RenderAutomation/Template.js";
import { useLocation } from "react-router-dom";
import PaymentsAllNew from "./Componet/Payment/PaymentsAllNew";
import Login from "./Componet/Auth/Login.tsx";
import Register from "./Componet/Auth/Register.tsx";

function App() {
  const location = useLocation();
  const [payment, setPayment] = useState(
    location.pathname.includes("payments")
  );
  const [authLogin, setAuthLogin] = useState(
    location.pathname === "/auth/login"
  );
  const [authRegister, setAuthRegister] = useState(
    location.pathname === "/auth/register"
  );

  useEffect(() => {
    setPayment(location.pathname.includes("payments"));
    setAuthLogin(location.pathname === "/auth/login");
    setAuthRegister(location.pathname === "/auth/register");
  }, [location]);

  return (
    <>
      {authLogin ? (
        <Login />
      ) : authRegister ? (
        <Register />
      ) : payment ? (
        <PaymentsAllNew />
      ) : (
        <Template />
      )}
    </>
  );
}

export default App;
