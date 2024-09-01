import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import {
  cartStyle,
  flexDiv,
  h100w100,
  homeStyle,
} from "../../commonFiles/commonTheme";
import StarRating from "../../commonFiles/StartRatins";
import Quantity from "../../commonFiles/Quantity";
import { CartListData } from "../../commonFiles/commonTypes";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { FetchErrorEmptyCart } from "../../Lottie/lottieComponent/FetchErrorEmptyCart";
import { EmptyCart } from "../../Lottie/lottieComponent/EmptyCart";

const orderButton = {
  borderRadius: "0",
  backgroundColor: "#ffbe0b",
  color: "white",
  width: "100%",
};

const CartIsEmpty = () => {
  return (
    <div style={{ ...h100w100, ...flexDiv }}>
      Your Cart is Empty
      <EmptyCart />
    </div>
  );
};
const Cart = () => {
  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;
  const [cartList, setCartList] = useState<CartListData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const getCartList = async (customerId: string) => {
    try {
      setIsLoading(true);
      const getData = await axios.get(
        `http://localhost:3000/cart/get/${customerId}`
      );
      if (getData.data.items.length > 0) {
        setCartList(getData.data.items);
      } else {
        setEmptyCart(true);
      }
    } catch (error) {
      setFetchError(true);
      console.log("error>>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      getCartList(customerId);
    }
  }, [customerId]);

  const handleRemove = async (customerId: string, prodId: string) => {
    try {
      await axios.post("http://localhost:3000/cart/remove", {
        customerId,
        prodId,
      });
      const newCartList = cartList.filter((item) => item.prodId !== prodId);
      setCartList(newCartList);
    } catch (error) {
      toast("Error updating wishlist. Please try again later.", {
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div
        style={{
          ...homeStyle.outerDiv,
          overflow: "auto",
        }}
      >
        {isLoading ? (
          <div style={{ ...h100w100, ...flexDiv }}>
            <CircularProgress
              sx={{
                color: "#ffb703",
              }}
            />
          </div>
        ) : customerId === "" ? (
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
        ) : fetchError ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              ...flexDiv,
            }}
          >
            Sorry We are unable to get your Items
            <FetchErrorEmptyCart />
          </div>
        ) : cartList.length ? (
          <Grid container spacing={2}>
            {cartList.map((card, index) => (
              <Grid item xs={2} sm={4}>
                <Card
                  data-testid={`product_${card.prodId}`}
                  style={cartStyle.cardStyle}
                  key={index}
                >
                  <CardActionArea sx={cartStyle.cardAction}>
                    <CardMedia sx={cartStyle.cardMedia}>
                      <img src={card.prodImg} style={cartStyle.imageStyle} />
                    </CardMedia>
                  </CardActionArea>
                  <Box
                    style={{
                      height: "20rem",
                      backgroundColor: "#00111c",
                      padding: "5%",
                      position: "relative",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "20px",
                        color: "white",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        maxWidth: "100%",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.prodDiscrip}
                    </Typography>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "5%",
                      }}
                    >
                      <Box
                        style={{
                          ...flexDiv,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          style={cartStyle.priceText}
                        >{`₹ ${card.prodPrice}.00`}</Typography>
                        <StarRating rating={card.rating} />
                      </Box>
                      <CardActions sx={{ padding: "0", marginTop: "2%" }}>
                        <Button
                          style={cartStyle.IconButton}
                          onClick={() => {
                            handleRemove(customerId, card.prodId);
                          }}
                        >
                          Remove from cart
                        </Button>
                        <Quantity
                          style={{
                            width: "50%",
                            marginLeft: "10%",
                            scale: "0.8",
                          }}
                        />
                      </CardActions>
                    </div>
                  </Box>
                  <Button style={orderButton}>Place your Order</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : null}
        {emptyCart && <CartIsEmpty />}
        <div data-testid="toast">
          <ToastContainer
            position="bottom-left"
            toastClassName={styles.toast}
            bodyClassName={styles.body}
            hideProgressBar={true}
            autoClose={1000}
          />
        </div>
      </div>
    </>
  );
};
export default Cart;
