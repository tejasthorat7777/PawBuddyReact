import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import harnessCard from "../../assets/harness_copy.png";
import collar from "../../assets/red-dog-collar.jpg";
import scooper from "../../assets/poop-scooper2.png";
import adultPedegree from "../../assets/adultPedegree.jpg";
import tickShampoo from "../../assets/tickfree_shampoo_200ml_1.jpg";
import leash from "../../assets/leashHome.jpg";
import purinaDry from "../../assets/purinaDryFood.jpg";
import k9Harness from "../../assets/K9Harness.jpg";
import { flexDiv } from "../../commonFiles/commonTheme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/toast.module.css";

const outerDiv = {
  height: "100%",
  width: "100%",
  backgroundColor: "#597081",
  padding: "1.5rem",
};

const commonDiv = {
  display: "flex",
  height: "18rem",
  justifyContent: "space-evenly",
};

const cardContent = {
  backgroundColor: "#00111c",
  color: "white",
  ...flexDiv,
  justifyContent: "space-between",
};

const cardMedia = {
  height: "100%",
  objectFit: "cover",
  ...flexDiv,
};
const Home = () => {
  const handleToaste = () =>
    toast("Item added to Cart", {
      autoClose: 1000,
    });

  const firstRowcard = [
    { cardText: "Harness", cardImage: harnessCard, cardPrice: "759" },
    { cardText: "Collar", cardImage: collar, cardPrice: "259" },
    { cardText: "Poo Scooper", cardImage: scooper, cardPrice: "389" },
    { cardText: "Pendent", cardImage: adultPedegree, cardPrice: "699" },
  ];
  const secondRowcard = [
    { cardText: "Harness", cardImage: tickShampoo, cardPrice: "759" },
    { cardText: "Harness", cardImage: purinaDry, cardPrice: "389" },
    { cardText: "Harness", cardImage: k9Harness, cardPrice: "699" },
    { cardText: "Harness", cardImage: leash, cardPrice: "259" },
  ];

  const buttonIcon = [
    <ShoppingCartOutlinedIcon />,
    <FavoriteBorderOutlinedIcon />,
    <AddIcon />,
  ];

  return (
    <div style={outerDiv}>
      <div style={commonDiv}>
        {firstRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: "15rem" }}>
            <CardActionArea
              key={index}
              style={{ height: "11.5rem", padding: 10 }}
            >
              <CardMedia sx={cardMedia} title={cardObject.cardText}>
                <img
                  src={cardObject.cardImage}
                  style={{ height: "100%", width: "auto" }}
                />
              </CardMedia>
            </CardActionArea>
            <CardContent sx={cardContent}>
              <Typography>{cardObject.cardText}</Typography>
              <Typography>{`₹ ${cardObject.cardPrice}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              {buttonIcon.map((iconName, index) => (
                <Button
                  size="small"
                  key={index}
                  style={{ color: "white" }}
                  onClick={handleToaste}
                >
                  <ToastContainer
                    position="bottom-left"
                    toastClassName={styles.toast}
                    bodyClassName={styles.body}
                    hideProgressBar={true}
                    autoClose={1000}
                  />
                  {iconName}
                </Button>
              ))}
            </CardActions>
          </Card>
        ))}
      </div>
      <div
        style={{
          ...commonDiv,
          marginTop: "1rem",
        }}
      >
        {secondRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: 220 }}>
            <CardActionArea
              key={index}
              style={{ height: "11.5rem", padding: 10 }}
            >
              <CardMedia
                style={{
                  height: "100%",
                  objectFit: "cover",
                  ...flexDiv,
                }}
                title={cardObject.cardText}
              >
                <img
                  src={cardObject.cardImage}
                  style={{ height: "100%", width: "auto" }}
                />
              </CardMedia>
            </CardActionArea>
            <CardContent sx={cardContent}>
              <Typography>{cardObject.cardText}</Typography>
              <Typography>{`₹ ${cardObject.cardPrice}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              {buttonIcon.map((iconName, index) => (
                <Button size="small" key={index} style={{ color: "white" }}>
                  {iconName}
                </Button>
              ))}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Home;
