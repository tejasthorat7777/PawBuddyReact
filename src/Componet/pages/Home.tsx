import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from "@mui/icons-material/Add";
import { flexDiv, h100w100, homeStyle } from "../../commonFiles/commonTheme";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  CartListData,
  ProductData,
  WishListData,
} from "../../commonFiles/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import {
  clearData,
  isItemExists,
  loadCached,
} from "../../commonFiles/commonFunctions";
import { BadRequest } from "../../Lottie/lottieComponent/BadRequest";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishListData[]>([]);
  const [cartList, setCartList] = useState<CartListData[]>([]);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchProduct, setFetchProduct] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const cachedProducts = loadCached("cachedProducts");
      if (cachedProducts) {
        setProducts(cachedProducts);
        setIsLoading(false);
        return;
      }
      let Products: ProductData[] = [];
      const getData = await axios.get(`${apiUrl}/api/getProducts`);
      const data = getData.data;
      data.map((doc: any) => {
        doc.products.map((product: any) => {
          Products.push(product);
        });
      });

      setProducts(Products);
      localStorage.setItem("cachedProducts", JSON.stringify(Products));
    } catch (error) {
      setFetchProduct(true);
      // TODO handle error
      console.log("error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWishList = async (customerId: string) => {
    try {
      const getData = await axios.get(
        `${apiUrl}/api/wishlist/get/${customerId}`
      );
      if (getData.data.items.length > 0) {
        setWishlistItems(getData.data.items);
      }
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  const getCartList = async (customerId: string) => {
    try {
      const getData = await axios.get(`${apiUrl}/api/cart/get/${customerId}`);
      if (getData.data.items.length > 0) {
        setCartList(getData.data.items);
      }
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  useEffect(() => {
    clearData("cachedProducts");
    getProducts();
    if (customerId) {
      getWishList(customerId);
      getCartList(customerId);
    }
    return () => {
      setProducts([]);
      setWishlistItems([]);
      setCartList([]);
    };
  }, [customerId]);

  const addTocart = async (item: ProductData) => {
    if (!customerId) {
      toast("Please log in to add items to your Cart.", {
        autoClose: 1000,
      });
      return;
    }

    const exists = isItemExists(cartList, item.prodId);

    try {
      if (!exists) {
        const dumpedData = { ...item, customerId };
        setCartList((prevCartList) => [...prevCartList, item]);
        toast("Item added to Cart", { autoClose: 1000 });
        await axios.post(`${apiUrl}/api/cart/dumped`, dumpedData);
      } else {
        setCartList((prevCartList) =>
          prevCartList.filter((cartList) => cartList.prodId !== item.prodId)
        );
        toast("Item removed from Cart", { autoClose: 1000 });
        await axios.post(`${apiUrl}/api/cart/remove`, {
          customerId,
          prodId: item.prodId,
        });
      }
    } catch (error) {
      toast("Error updating Cart. Please try again later.", {
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };

  const addToWishlist = async (item: ProductData) => {
    if (!customerId) {
      toast("Please log in to add items to your wishlist.", {
        autoClose: 1000,
      });
      return;
    }

    const exists = isItemExists(wishlistItems, item.prodId);

    try {
      if (!exists) {
        const dumpedData = { ...item, customerId };
        await axios.post(`${apiUrl}/api/wishlist/dumped`, dumpedData);
        setWishlistItems((prevWishlistItems) => [...prevWishlistItems, item]);
        toast("Item added to Wishlist", { autoClose: 1000 });
      } else {
        await axios.post(`${apiUrl}/api/wishlist/remove`, {
          customerId,
          prodId: item.prodId,
        });
        setWishlistItems((prevWishlistItems) =>
          prevWishlistItems.filter(
            (wishlistItem) => wishlistItem.prodId !== item.prodId
          )
        );
        toast("Item removed from Wishlist", { autoClose: 1000 });
      }
    } catch (error) {
      toast("Error updating wishlist. Please try again later.", {
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };

  const handleShare = async (title: string, price: string) => {
    try {
      await navigator.share({
        title: title,
        text: `Check out this ${title} for just ₹ ${price}.00`,
        url: window.location.href,
      });
      console.log("Share successful");
    } catch (error) {
      toast("Sorry, Error in sharing", {
        autoClose: 1000,
      });
      console.log("Error sharing", error);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage]);

  return (
    <div style={{ ...homeStyle.outerDiv, paddingLeft: "5%" }}>
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : fetchProduct ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <BadRequest />
          Sorry No Product Found
          <br />
          Please try again...
        </div>
      ) : (
        <>
          <Grid container spacing={3} key="gridOuter">
            {currentProducts?.map((card, index) => (
              <Grid item md={3} key={index}>
                <Card
                  sx={{ maxWidth: "75%", maxHeight: "100%" }}
                  key={index}
                  data-testid={`product_${card.prodId}`}
                >
                  <CardActionArea style={{ height: "10rem", padding: 10 }}>
                    <CardMedia sx={homeStyle.cardMedia} title={card.prodName}>
                      <img
                        src={card.prodImg}
                        style={{ height: "100%", width: "auto" }}
                      />
                    </CardMedia>
                  </CardActionArea>
                  <CardContent sx={homeStyle.cardContent}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        maxWidth: "100%",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.prodName}
                    </Typography>
                    <Typography>{`₹ ${card.prodPrice}.00`}</Typography>
                  </CardContent>
                  <CardActions sx={{ backgroundColor: "#00111c" }}>
                    <Button
                      data-testid={`share_${card.prodId}`}
                      style={homeStyle.IconButton}
                      onClick={() => handleShare(card.prodName, card.prodPrice)}
                    >
                      <ShareOutlinedIcon />
                    </Button>
                    <Button
                      data-testid={`wishlist_${card.prodId}`}
                      onClick={() => addToWishlist(card)}
                      style={homeStyle.IconButton}
                    >
                      {isItemExists(wishlistItems, card.prodId) ? (
                        <FavoriteIcon
                          style={{ color: "#FF0000" }}
                          data-testid={`FavoriteIcon_${card.prodId}`}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          data-testid={`FavoriteBorderOutlinedIcon_${card.prodId}`}
                        />
                      )}
                    </Button>
                    <Button
                      data-testid={`cart_${card.prodId}`}
                      onClick={() => {
                        addTocart(card);
                      }}
                      style={homeStyle.IconButton}
                    >
                      {isItemExists(cartList, card.prodId) ? (
                        <DoneIcon />
                      ) : (
                        <AddIcon />
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Container style={homeStyle.PaginationDiv}>
            <Pagination
              shape="rounded"
              color="primary"
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
              }}
            />
          </Container>
        </>
      )}
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
