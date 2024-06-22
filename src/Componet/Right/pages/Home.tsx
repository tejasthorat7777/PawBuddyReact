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
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import harnessCard from "../../../assets/harness_copy.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import React from "react";

const outerDiv = {
  height: "100%",
  width: "100%",
  backgroundColor: "#597081",
  padding: "3%",
};

const commonDiv = {
  display: "flex",
  height: "50%",
  justifyContent: "space-evenly",
};

const Home = () => {
  const user = useSelector((state:RootState) => state.logid);

  React.useEffect(() => {
    console.log("User state:", user);
  }, [user]);

  const firstRowcard = [
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
  ];
  const secondRowcard = [
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
    { cardText: "Harness", cardImage: harnessCard },
  ];

  const buttonIcon = [
    <ShoppingCartOutlinedIcon />,
    <FavoriteBorderOutlinedIcon />,
    <ShareOutlinedIcon />,
  ];

  return (
    <div style={outerDiv}>
      <div style={commonDiv}>
        {firstRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: 220 }}>
            <CardActionArea key={index}>
              <CardMedia
                sx={{ height: 185 }}
                image={cardObject.cardImage}
                title={cardObject.cardText}
              />
            </CardActionArea>
            <CardContent sx={{ backgroundColor: "#00111c", color: "white" }}>
              <Typography>{cardObject.cardText}</Typography>
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
      <div
        style={{
          ...commonDiv,
          marginTop: "2%",
        }}
      >
        {secondRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: 220 }}>
            <CardActionArea key={index}>
              <CardMedia
                sx={{ height: 185 }}
                image={cardObject.cardImage}
                title="Harness"
              />
            </CardActionArea>
            <CardContent sx={{ backgroundColor: "#00111c", color: "white" }}>
              <Typography>{cardObject.cardText}</Typography>
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
