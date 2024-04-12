import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import homeIcon from "../../assets/home.png";

export default function HeroPage() {
  return (
    <>
      <Navbar />
      <Container
        style={{
          backgroundColor: "#00111c",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          width: "17vw",
          marginLeft: "0%",
          height: "100vh",
          color: "white",
          padding: "0",
        }}
      >
        <Container
          style={{
            height: "100%",
            width: "100%",
            padding: "0",
            marginTop: "2%",
          }}
        >
          <Container
            style={{
              backgroundColor: "#001523",
              width: "100%",
              height: "5%",
              padding: "3%",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "cursive",
              }}
            >
              <img
                src={homeIcon}
                alt=""
                style={{ height: "100%", marginRight: "5%" }}
              />
              Home
            </div>
          </Container>
        </Container>
      </Container>
    </>
  );
}
