import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { cartStyle, flexDiv, homeStyle } from "../../commonFiles/commonTheme";
import StarRating from "../../commonFiles/StartRatins";
import Quantity from "../../commonFiles/Quantity";
import harnessCard from "../../assets/harness_copy.png";
import collar from "../../assets/red-dog-collar.jpg";
import scooper from "../../assets/poop-scooper2.png";
import adultPedegree from "../../assets/adultPedegree.jpg";
import tickShampoo from "../../assets/tickfree_shampoo_200ml_1.jpg";
import leash from "../../assets/leashHome.jpg";
import purinaDry from "../../assets/purinaDryFood.jpg";
import k9Harness from "../../assets/K9Harness.jpg";
import { ProductData } from "../../commonFiles/commonTypes";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const orderButton = {
  borderRadius: "0",
  backgroundColor: "#ffbe0b",
  color: "white",
  width: "100%",
};

const Cart = () => {
  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;
  const des =
    "Foodie Puppies Adjustable Nylon Tactical Dog Collar - (Green, Xtra-Large) for Large & Giant Dogs | Metal D-Ring with Strap Handle | Durable & Adjustable Collar for Dog Military Training";

  const rowCard1: ProductData[] = [
    {
      productId: "2",
      prouctName: "Collar",
      imageSource: collar,
      price: "259",
      selected: false,
      rating: 1,
      description:
        "Foodie Puppies Adjustable Nylon Tactical Dog Collar - (Green, Xtra-Large) for Large & Giant Dogs | Metal D-Ring with Strap Handle | Durable & Adjustable Collar for Dog Military Training",
    },
    {
      productId: "3",
      prouctName: "Poo Scooper",
      imageSource: scooper,
      price: "389",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "4",
      prouctName: "Pedegree",
      imageSource: adultPedegree,
      price: "699",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "5",
      prouctName: "Tickfree",
      imageSource: tickShampoo,
      price: "759",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "6",
      prouctName: "purina dry food",
      imageSource: purinaDry,
      price: "389",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "7",
      prouctName: "K9 Harness",
      description: "",
      imageSource: k9Harness,
      price: "699",
      selected: false,
      rating: 1,
    },
    {
      productId: "8",
      prouctName: "Red leash",
      imageSource: leash,
      price: "259",
      description: "",
      selected: false,
      rating: 1,
    },
    {
      productId: "9",
      prouctName: "Pedegree",
      imageSource: adultPedegree,
      price: "699",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "10",
      prouctName: "Tickfree",
      imageSource: tickShampoo,
      price: "759",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "11",
      prouctName: "purina dry food",
      imageSource: purinaDry,
      price: "389",
      selected: false,
      description: "",
      rating: 1,
    },
    {
      productId: "12",
      prouctName: "K9 Harness",
      description: "",
      imageSource: k9Harness,
      price: "699",
      rating: 1,
      selected: false,
    },
    {
      productId: "13",
      prouctName: "Red leash",
      imageSource: leash,
      price: "259",
      description: "",
      selected: false,
      rating: 1,
    },
    {
      productId: "14",
      prouctName: "Harness",
      imageSource: harnessCard,
      price: "759",
      selected: false,
      description: "",
      rating: 1,
    },
  ];

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        overflow: "auto",
      }}
    >
      {customerId === "" ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            ...flexDiv,
          }}
        >
          Please Login
          <LoginRequired />
        </div>
      ) : (
        <Grid container spacing={2}>
          {rowCard1.map((card, index) => (
            <Grid item xs={2} sm={4}>
              <Card
                data-testid={`product_${card.productId}`}
                style={cartStyle.cardStyle}
                key={index}
              >
                <CardActionArea sx={cartStyle.cardAction}>
                  <CardMedia sx={cartStyle.cardMedia}>
                    <img src={card.imageSource} style={cartStyle.imageStyle} />
                  </CardMedia>
                </CardActionArea>
                <Box style={cartStyle.boxStyle}>
                  <Typography style={cartStyle.detailsText}>
                    {card.description}
                  </Typography>
                  <Box style={{ ...flexDiv, justifyContent: "space-between" }}>
                    <Typography
                      style={cartStyle.priceText}
                    >{`₹ ${card.price}.00`}</Typography>
                    <StarRating rating={card.rating} />
                  </Box>
                  <CardActions sx={{ padding: "0", marginTop: "2%" }}>
                    <Button style={cartStyle.IconButton}>
                      Remove from cart
                    </Button>
                    <Quantity
                      style={{ width: "50%", marginLeft: "5%", scale: "0.8" }}
                    />
                  </CardActions>
                </Box>
                <Button style={orderButton}>Place your Order</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
export default Cart;
