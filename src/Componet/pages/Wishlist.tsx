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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { EmptyCart } from "../../Lottie/lottieComponent/EmptyCart";
import { wishlistItem } from "../../redux/Slice/Slices";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";

const Wishlist = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const dispatch = useDispatch();

  const cardData = useSelector(
    (state: RootState) => state.finalState.itemWishlist
  );
  const user = useSelector((state: RootState) => state.finalState.user);
  console.log("card>>>>>", cardData);

  const handleXmark = (productId: string) => {
    dispatch(wishlistItem({ item: { productId } }));
  };

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        padding: "2%",
        overflow: "auto",
      }}
    >
      {user?.userId === "" ? (
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
          {cardData?.map((card) => (
            <Grid item xs={2} sm={4}>
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
                  onClick={() => handleXmark(card.productId)}
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
