import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./Componet/Registration/Registration.js";
import Template from "./RenderAutomation/Template.js";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [regi, setRegi] = useState(location.pathname.includes("registration"));

  useEffect(() => {
    setRegi(location.pathname.includes("registration"));
  }, [location]);

  return <>{regi ? <Registration /> : <Template />}</>;
}

export default App;
