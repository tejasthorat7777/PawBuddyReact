import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./Componet/Registration/Registration.js";
import Template from "./RenderAutomation/Template.js";
import { useLocation } from "react-router-dom";
import LoginForm from "./Componet/Login/LoginForm.js";
import PaymentsAllNew from "./Componet/Payment/PaymentsAllNew";
function App() {
  const location = useLocation();
  const [regi, setRegi] = useState(location.pathname.includes("registration"));
  const [login, setLogin] = useState(location.pathname.includes("login"));
  const [payment, setPayment] = useState(location.pathname.includes("payments"));

  useEffect(() => {
    setRegi(location.pathname.includes("registration"));
    setLogin(location.pathname.includes("login"));
    setPayment(location.pathname.includes("payments"));
  }, [location]);

  return (
    <>
      {regi ? (
        <Registration />
      ) : login ? (
        <LoginForm />
      ) : payment ? (
        <PaymentsAllNew />
      ) : (
        <Template />
      )}
    </>
  );
}

export default App;
