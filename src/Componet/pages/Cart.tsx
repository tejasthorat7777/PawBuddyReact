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
import { Quantity } from "../../commonFiles/Quantity";
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
import {
  apiUrl,
  clearData,
  generateRandomOrderId,
  getDate,
  loadCached,
} from "../../commonFiles/commonFunctions";

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
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;
  const [cartList, setCartList] = useState<CartListData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const getCartList = async (customerId: string) => {
    try {
      setIsLoading(true);
      const cachedCart = loadCached("cachedCart");
      if (cachedCart) {
        setCartList(cachedCart);
        setIsLoading(false);
        return;
      }
      const getData = await axios.get(`${apiUrl}/cart/get/${customerId}`);
      if (getData.data.items.length === 0) {
        setEmptyCart(true);
      } else {
        localStorage.setItem("cachedCart", JSON.stringify(getData.data.items));
        setCartList(getData.data.items);
      }
    } catch (error) {
      setFetchError("Sorry We are unable to get your Items");
      console.log("error>>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    clearData("cachedCart");
    if (customerId) {
      getCartList(customerId);
    }
  }, [customerId]);

  const handleOrder = async (customerId: string, card: CartListData) => {
    setIsLoading(true);
    const customerName = user.name;
    const orderDate = getDate();
    const orderId = generateRandomOrderId();
    const newItem = {
      customerId,
      customerName,
      orderDate,
      orderId,
      ...card,
    };
    try {
      await axios.post(`${apiUrl}/orders/dumped`, newItem);
      handleRemove(customerId, card.prodId);
    } catch (error) {
      console.log("error>>>>", error);
      toast("Unable to place your order. Please try again later.", {
        autoClose: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (customerId: string, prodId: string) => {
    try {
      await axios.post(`${apiUrl}/cart/remove`, {
        customerId,
        prodId,
      });
      const newCartList = cartList.filter((item) => item.prodId !== prodId);
      if (!newCartList.length) {
        setEmptyCart(true);
      }
      setCartList(newCartList);
    } catch (error) {
      toast("Error updating wishlist. Please try again later.", {
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };
  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress
            data-testid="loader"
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
          {fetchError}
          <FetchErrorEmptyCart />
        </div>
      ) : cartList.length ? (
        <Grid container spacing={2}>
          {cartList.map((card, index) => (
            <Grid item xs={2} sm={4} key={`grid_${index}`}>
              <Card
                data-testid={`product_${card.prodId}`}
                style={cartStyle.cardStyle}
                key={`Card_${index}`}
              >
                <CardActionArea sx={cartStyle.cardAction}>
                  <CardMedia
                    sx={cartStyle.cardMedia}
                    data-testid={`CartImage_${card.prodId}`}
                  >
                    <img
                      src={card.prodImg}
                      alt={`Product Image ${index + 1}`}
                      style={cartStyle.imageStyle}
                    />
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
                        sx={{
                          textTransform: "none",
                        }}
                        data-testid={`remove_${card.prodId}`}
                        style={cartStyle.IconButton}
                        onClick={() => {
                          handleRemove(customerId, card.prodId);
                        }}
                      >
                        Remove From Cart
                      </Button>
                      <Quantity
                        id={card.prodId}
                        style={{
                          width: "50%",
                          marginLeft: "10%",
                          scale: "0.8",
                        }}
                      />
                    </CardActions>
                  </div>
                </Box>
                <Button
                  data-testid={`orderBtn_${card.prodId}`}
                  style={orderButton}
                  onClick={() => {
                    handleOrder(customerId, card);
                  }}
                >
                  Place your Order
                </Button>
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
  );
};
export default Cart;
