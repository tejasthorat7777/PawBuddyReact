import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from "@mui/icons-material/Add";
import harnessCard from "../../assets/harness_copy.png";
import collar from "../../assets/red-dog-collar.jpg";
import scooper from "../../assets/poop-scooper2.png";
import adultPedegree from "../../assets/adultPedegree.jpg";
import tickShampoo from "../../assets/tickfree_shampoo_200ml_1.jpg";
import leash from "../../assets/leashHome.jpg";
import purinaDry from "../../assets/purinaDryFood.jpg";
import k9Harness from "../../assets/K9Harness.jpg";
import { homeStyle, flexDiv } from "../../commonFiles/commonTheme";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { useState } from "react";

const Home = () => {
  const rowCard1 = [
    {
      cardText: "Harness",
      cardImage: harnessCard,
      cardPrice: "759",
      selected: false,
    },
    {
      cardText: "Collar",
      cardImage: collar,
      cardPrice: "259",
      selected: false,
    },
    {
      cardText: "Poo Scooper",
      cardImage: scooper,
      cardPrice: "389",
      selected: false,
    },
    {
      cardText: "Pedegree",
      cardImage: adultPedegree,
      cardPrice: "699",
      selected: false,
    },
  ];
  const rowCard2 = [
    {
      cardText: "Tickfree",
      cardImage: tickShampoo,
      cardPrice: "759",
      selected: false,
    },
    {
      cardText: "purina dry food",
      cardImage: purinaDry,
      cardPrice: "389",
      selected: false,
    },
    {
      cardText: "K9 Harness",
      cardImage: k9Harness,
      cardPrice: "699",
      selected: false,
    },
    {
      cardText: "Red leash",
      cardImage: leash,
      cardPrice: "259",
      selected: false,
    },
  ];
  const [firstRowcard, setFirstRowcard] = useState(rowCard1);
  const [secondRowcard, setSecondRowcard] = useState(rowCard2);

  const addTocart = (index: number, isFirstRow: boolean) => {
    if (isFirstRow) {
      setFirstRowcard((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    } else {
      setSecondRowcard((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    }
    toast(
      `${
        firstRowcard[index].selected ? "Item Removed from" : "Item added to"
      } Cart`
    );
  };

  const addToWishlist = () =>
    toast("Item added to Wishlist", {
      autoClose: 1000,
    });

  return (
    <div style={homeStyle.outerDiv}>
      <div style={homeStyle.commonDiv}>
        {firstRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: "15rem" }} key={index}>
            <CardActionArea style={{ height: "12rem", padding: 10 }}>
              <CardMedia sx={homeStyle.cardMedia} title={cardObject.cardText}>
                <img
                  src={cardObject.cardImage}
                  style={{ height: "100%", width: "auto" }}
                />
              </CardMedia>
            </CardActionArea>
            <CardContent sx={homeStyle.cardContent}>
              <Typography>{cardObject.cardText}</Typography>
              <Typography>{`₹ ${cardObject.cardPrice}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              <Button style={homeStyle.IconButton}>
                <ShareOutlinedIcon />
              </Button>
              <Button onClick={addToWishlist} style={homeStyle.IconButton}>
                <FavoriteBorderOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  addTocart(index, true);
                }}
                style={homeStyle.IconButton}
              >
                {cardObject.selected ? <DoneIcon /> : <AddIcon />}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div
        style={{
          ...homeStyle.commonDiv,
          marginTop: "1rem",
        }}
      >
        {secondRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: 220 }} key={index}>
            <CardActionArea style={{ height: "12rem", padding: 10 }}>
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
            <CardContent sx={homeStyle.cardContent}>
              <Typography>{cardObject.cardText}</Typography>
              <Typography>{`₹ ${cardObject.cardPrice}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              <Button style={homeStyle.IconButton}>
                <ShareOutlinedIcon />
              </Button>
              <Button onClick={addToWishlist} style={homeStyle.IconButton}>
                <FavoriteBorderOutlinedIcon />
              </Button>
              <Button
                onClick={() => addTocart(index, false)}
                style={homeStyle.IconButton}
              >
                {cardObject.selected ? <DoneIcon /> : <AddIcon />}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Container style={homeStyle.PaginationDiv}>
        <Pagination
          shape="rounded"
          color="primary"
          count={10}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
          }}
        />
      </Container>
      <ToastContainer
        position="bottom-left"
        toastClassName={styles.toast}
        bodyClassName={styles.body}
        hideProgressBar={true}
        autoClose={1000}
      />
    </div>
  );
};
export default Home;
