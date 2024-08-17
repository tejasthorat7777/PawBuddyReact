import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from "@mui/icons-material/Add";
import { homeStyle } from "../../commonFiles/commonTheme";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { useEffect, useMemo, useState } from "react";
import { ProductData } from "../../commonFiles/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";

const Home = () => {
  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const getData = await axios.get("http://localhost:3000/getProducts");
      const data = getData.data;
      setProducts(data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTocart = (index: number, isFirstRow: ProductData[]) => {
    if (isFirstRow) {
      setProducts((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    }
    toast(
      `${
        products[index].selected ? "Item removed from" : "Item added to"
      } Cart`
    );
  };

  const addToWishlist = async (item: ProductData) => {
    if (customerId) {
      const dumpedData = {
        ...item,
        customerId: customerId,
      };

      try {
        await axios.post("http://localhost:3000/wishlist/dumped", dumpedData);
        const itemId = `addedtoWishList${item.prodId}`;

        if (!wishlistItems.includes(itemId)) {
          setWishlistItems([...wishlistItems, itemId]);
          toast("Item added to Wishlist", {
            autoClose: 1000,
          });
        } else {
          setWishlistItems(wishlistItems.filter((id) => id !== itemId));
          toast("Item removed from Wishlist", {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.log("error>>>", error);
        toast("Unable to add in Wishlist", {
          autoClose: 1000,
        });
      }
    } else {
      toast("Sorry, Please Login...", {
        autoClose: 1000,
      });
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
                  {wishlistItems.includes(`addedtoWishList${card.prodId}`) ? (
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
  );
};
export default Home;
