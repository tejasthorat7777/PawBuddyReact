import { flexDiv, homeStyle } from "../../commonFiles/commonTheme";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { EmptyCart } from "../../Lottie/lottieComponent/EmptyCart";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import axios from "axios";
import { ProductData } from "../../commonFiles/commonTypes";

const Wishlist = () => {
  
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [cardData, setCardData] = useState<ProductData[]>([]);
  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;

  const getWishList = async (customerId: string) => {
    console.log("customrer",customerId)
    try {
      const getData = await axios.get(
        `http://localhost:3000/wishlist/get/${customerId}`
      );
      setCardData(getData.data.items);
    } catch (error) {
      console.log("error>>>", error);
    }
  };


  useEffect(() => {
    if (customerId) {
      getWishList(customerId);
    }
  }, [customerId]);

  const handleXmark = async (customerId: string, productId: string) => {
    const newCardData = cardData.filter((item) => item.productId !== productId);
    setCardData(newCardData);
    try {
      await axios.post("http://localhost:3000/wishlist/remove", {
        customerId,
        productId,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        padding: "2%",
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
      ) : cardData?.length ? (
        <Grid container spacing={2} key="gridOuter">
          {cardData?.map((card, index) => (
            <Grid item xs={2} sm={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  height: "10rem",
                  width: "25rem",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    color: "white",
                  }}
                  onClick={() => handleXmark(customerId, card.productId)}
                >
                  <CloseIcon />
                </IconButton>
                <CardActionArea
                  style={{
                    height: "100%",
                    width: "10rem",
                  }}
                >
                  <CardMedia sx={{ ...homeStyle.cardMedia, padding: "1%" }}>
                    <img
                      src={card?.imageSource}
                      style={{ height: "80%", width: "80%" }}
                    />
                  </CardMedia>
                </CardActionArea>
                <Box
                  sx={{
                    ...flexDiv,
                    flexDirection: "column",
                    width: "15rem",
                    padding: "3%",
                    backgroundColor: "#00111c",
                    alignItems: "flex-start",
                    color: "white",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      maxWidth: "100%",
                    }}
                  >
                    {card?.description}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "18px",
                    }}
                  >{`₹ ${card?.price}.00`}</Typography>

                  <CardActions sx={{ padding: "0", marginTop: "0.5rem" }}>
                    <Button
                      style={{
                        ...homeStyle.IconButton,
                        fontSize: "12px",
                        backgroundColor:
                          hoveredButton === `addToCart${card?.productId}`
                            ? "#e85d04"
                            : "#ffbe0b",
                      }}
                      onMouseEnter={() =>
                        setHoveredButton(`addToCart${card?.productId}`)
                      }
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      style={{
                        ...homeStyle.IconButton,
                        fontSize: "12px",
                        marginLeft: "3rem",
                        backgroundColor:
                          hoveredButton === `buyNow${card?.productId}`
                            ? "#e85d04"
                            : "#ffbe0b",
                      }}
                      onMouseEnter={() =>
                        setHoveredButton(`buyNow${card?.productId}`)
                      }
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Buy Now
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            ...flexDiv,
          }}
        >
          Your Cart Is Empty
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
