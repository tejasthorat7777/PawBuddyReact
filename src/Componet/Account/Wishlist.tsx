import { flexDiv, h100w100, homeStyle } from "../../commonFiles/commonTheme";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
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
import { FetchErrorEmptyCart } from "../../Lottie/lottieComponent/FetchErrorEmptyCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { clearData, loadCached } from "../../commonFiles/commonFunctions";

const EmptyCartComponent = () => {
  return (
    <div style={{ ...h100w100, ...flexDiv }}>
      You Don't have any favourite item
      <EmptyCart />
    </div>
  );
};

const Wishlist = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [cardData, setCardData] = useState<ProductData[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;
  const apiUrl = import.meta.env.VITE_API_URL;

  const getWishList = async (customerId: string) => {
    try {
      setIsLoading(true);
      const cachedWishlist = loadCached("cachedWishlist");
      if (cachedWishlist) {
        setCardData(cachedWishlist);
        setIsLoading(false);
        return;
      }
      const getData = await axios.get(
        `${apiUrl}/api/wishlist/get/${customerId}`
      );
      if (getData.data.items.length === 0) {
        setEmptyCart(true);
      } else {
        localStorage.setItem(
          "cachedWishlist",
          JSON.stringify(getData.data.items)
        );
        setCardData(getData.data.items);
      }
    } catch (error) {
      setFetchError(true);
      console.log("error>>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    clearData("cachedWishlist");
    if (customerId) {
      getWishList(customerId);
    }
  }, [customerId]);

  const handleXmark = async (customerId: string, prodId: string) => {
    try {
      await axios.post(`${apiUrl}/api/wishlist/remove`, {
        customerId,
        prodId,
      });
      const newCardData = cardData.filter((item) => item.prodId !== prodId);
      if (!newCardData.length) {
        setEmptyCart(true);
      }
      setCardData(newCardData);
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
        padding: "2%",
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
          Sorry We are unable to get your wishlist
          <FetchErrorEmptyCart />
        </div>
      ) : cardData.length ? (
        <Grid container spacing={2} key="gridOuter">
          {cardData?.map((card, index) => (
            <Grid item xs={2} sm={4} key={index}>
              <Card
                data-testid={`product_${card.prodId}`}
                sx={{
                  display: "flex",
                  height: "10rem",
                  width: "25rem",
                  position: "relative",
                }}
              >
                <IconButton
                  data-testid={`Xbutton_${card.prodId}`}
                  id={`Xbutton_${card.prodId}`}
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    color: "white",
                  }}
                  onClick={() => handleXmark(customerId, card.prodId)}
                >
                  <CloseIcon />
                </IconButton>
                <CardActionArea
                  style={{
                    height: "100%",
                    width: "10rem",
                  }}
                >
                  <CardMedia
                    sx={{ ...homeStyle.cardMedia, padding: "1%" }}
                    data-testid={`imag_${card.prodId}`}
                  >
                    <img
                      src={card?.prodImg}
                      alt={`Product Image ${index + 1}`}
                      style={{ height: "90%", width: "80%" }}
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
                    data-testid={`prodDiscipt_${card.prodId}`}
                    style={{
                      fontSize: "14px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      maxWidth: "100%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card?.prodDiscrip}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "18px",
                    }}
                  >{`₹ ${card?.prodPrice}.00`}</Typography>

                  <CardActions
                    sx={{ padding: "0", marginTop: "5%", width: "100%" }}
                  >
                    <Button
                      data-testid={`addToCart${card?.prodId}`}
                      style={{
                        ...homeStyle.IconButton,
                        fontSize: "70%",
                        backgroundColor:
                          hoveredButton === `addToCart${card?.prodId}`
                            ? "#e85d04"
                            : "#ffbe0b",
                      }}
                      onMouseEnter={() =>
                        setHoveredButton(`addToCart${card?.prodId}`)
                      }
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      data-testid={`buyNow${card?.prodId}`}
                      style={{
                        ...homeStyle.IconButton,
                        fontSize: "70%",
                        marginLeft: "20%",
                        backgroundColor:
                          hoveredButton === `buyNow${card?.prodId}`
                            ? "#e85d04"
                            : "#ffbe0b",
                      }}
                      onMouseEnter={() =>
                        setHoveredButton(`buyNow${card?.prodId}`)
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
      ) : null}
      {emptyCart && <EmptyCartComponent />}
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

export default Wishlist;
