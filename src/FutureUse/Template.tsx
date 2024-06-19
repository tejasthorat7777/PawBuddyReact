import { Row } from "react-bootstrap";
import Right from "../Componet/Right/Right";
import Left from "./Left";
import Navbar from "../Componet/Navbar/Navbar";
import { useEffect, useState } from "react";
import Registration from "../Componet/Registration/Registration";

const Template = () => {
  const [regi, setRegi] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("registration")) {
      setRegi(true);
    }
  }, []);
  return (
    <>
      {regi ? (
        <Registration />
      ) : (
        <main
          style={{
            flex: 1,
            height: "calc(var(--vh, 1vh) * 100)",
            overflow: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <Row
            className="m-0 p-0 scrollAnimation"
            style={{ flexGrow: 1, overflow: "auto" }}
          >
            <Left />
            <Right />
          </Row>
        </main>
      )}
    </>
  );
};
export default Template;
