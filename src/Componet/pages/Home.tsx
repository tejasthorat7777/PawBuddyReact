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
import { ProductData, WishListData } from "../../commonFiles/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";

const Home = () => {
  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishListData[]>([]);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      const getData = await axios.get("http://localhost:3000/getProducts");
      const data = getData.data;
      setProducts(data);
    } catch (error) {
      // TODO handle error
      console.log("error ", error);
    }
  };

  const getWishList = async (customerId: string) => {
    try {
      const getData = await axios.get(
        `http://localhost:3000/wishlist/get/${customerId}`
      );
      if (getData.data.items.length > 0) {
        setWishlistItems(getData.data.items);
      }
    } catch (error) {
      console.log("error>>>", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getProducts();
        if (customerId) {
          await getWishList(customerId);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast("Unable to load data. Please try again later.", {
          autoClose: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setProducts([]);
      setWishlistItems([]);
    };
  }, [customerId]);

  const isExistitemWishlist = (id: string) => {
    const itemExists = wishlistItems.some(
      (wishlistItem) => wishlistItem.prodId === id
    );
    return itemExists;
  };

  const addTocart = (index: number, isFirstRow: ProductData[]) => {
    if (isFirstRow) {
      setProducts((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    }
    toast(
      `${products[index].selected ? "Item removed from" : "Item added to"} Cart`
    );
  };

  const addToWishlist = async (item: ProductData) => {
    if (!customerId) {
      toast("Please log in to add items to your wishlist.", {
        autoClose: 1000,
      });
      return;
    }

    const exists = isExistitemWishlist(item.prodId);

    try {
      if (!exists) {
        const dumpedData = { ...item, customerId };
        await axios.post("http://localhost:3000/wishlist/dumped", dumpedData);
        setWishlistItems((prevWishlistItems) => [...prevWishlistItems, item]);
        toast("Item added to Wishlist", { autoClose: 1000 });
      } else {
        await axios.post("http://localhost:3000/wishlist/remove", {
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
    event: React.ChangeEvent<unknown>,
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
    <>
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ ...homeStyle.outerDiv, paddingLeft: "5%" }}>
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
                    <Typography>{card.prodName}</Typography>
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
                      {isExistitemWishlist(card.prodId) ? (
                        <FavoriteIcon
                          style={{ color: "red" }}
                          data-testid={`FavoriteIcon_${card.prodId}`}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          data-testid={`FavoriteBorderOutlinedIcon_${card.prodId}`}
                        />
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        addTocart(index, products);
                      }}
                      style={homeStyle.IconButton}
                    >
                      {card.selected ? <DoneIcon /> : <AddIcon />}
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
          <ToastContainer
            position="bottom-left"
            toastClassName={styles.toast}
            bodyClassName={styles.body}
            hideProgressBar={true}
            autoClose={1000}
          />
        </div>
      )}
    </>
  );
};
export default Home;
