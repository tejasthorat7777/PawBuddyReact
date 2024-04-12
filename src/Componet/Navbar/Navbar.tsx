import { Container } from "@mui/material";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        style={{ backgroundColor: "#00111c", height: "8vh", flex: "0 0 auto" }}
      >
      </Container>
      <Container
        style={{
          backgroundColor: "#00111c",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          width: "17vw",
          marginLeft: "0%",
        }}
      ></Container>
    </div>
  );
}
