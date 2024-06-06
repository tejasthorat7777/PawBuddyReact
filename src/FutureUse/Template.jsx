import { Row } from "react-bootstrap";
import Right from "../Componet/Right/Right"
import Left from "./Left"
import Navbar from "../Componet/Navbar/Navbar"

const Template = () => {
  return (
    <main
      style={{
        flex: 1,
        height: "calc(var(--vh, 1vh) * 100)",
        overflow: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar/>
      <Row
        className="m-0 p-0 scrollAnimation"
        style={{ flexGrow: 1, overflow: "auto" }}
      >
        <Left />
        <Right />
      </Row>
    </main>
  );
};
export default Template
