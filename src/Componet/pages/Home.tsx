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
import harnessCard from "../../assets/harness_copy.png";
import collar from "../../assets/red-dog-collar.jpg";
import scooper from "../../assets/poop-scooper2.png";
import adultPedegree from "../../assets/adultPedegree.jpg";
import tickShampoo from "../../assets/tickfree_shampoo_200ml_1.jpg";
import leash from "../../assets/leashHome.jpg";
import purinaDry from "../../assets/purinaDryFood.jpg";
import k9Harness from "../../assets/K9Harness.jpg";
import { homeStyle } from "../../commonFiles/commonTheme";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { useMemo, useState } from "react";
import { ProductData } from "../../commonFiles/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import MuiBackdrop from "../../commonFiles/MuiBackdrop";

const Home = () => {
  const rowCard1: ProductData[] = [
    {
      productId: "1",
      prouctName: "Harness",
      imageSource: harnessCard,
      price: "759",
      selected: false,
      description: "",
    },
    {
      productId: "2",
      prouctName: "Collar",
      imageSource: collar,
      price: "259",
      selected: false,
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
    },
    {
      productId: "4",
      prouctName: "Pedegree",
      imageSource: adultPedegree,
      price: "699",
      selected: false,
      description: "",
    },
    {
      productId: "5",
      prouctName: "Tickfree",
      imageSource: tickShampoo,
      price: "759",
      selected: false,
      description: "",
    },
    {
      productId: "6",
      prouctName: "purina dry food",
      imageSource: purinaDry,
      price: "389",
      selected: false,
      description: "",
    },
    {
      productId: "7",
      prouctName: "K9 Harness",
      description: "",
      imageSource: k9Harness,
      price: "699",
      selected: false,
    },
    {
      productId: "8",
      prouctName: "Red leash",
      imageSource: leash,
      price: "259",
      description: "",
      selected: false,
    },
    {
      productId: "9",
      prouctName: "Pedegree",
      imageSource: adultPedegree,
      price: "699",
      selected: false,
      description: "",
    },
    {
      productId: "10",
      prouctName: "Tickfree",
      imageSource: tickShampoo,
      price: "759",
      selected: false,
      description: "",
    },
    {
      productId: "11",
      prouctName: "purina dry food",
      imageSource: purinaDry,
      price: "389",
      selected: false,
      description: "",
    },
    {
      productId: "12",
      prouctName: "K9 Harness",
      description: "",
      imageSource: k9Harness,
      price: "699",
      selected: false,
    },
    {
      productId: "13",
      prouctName: "Red leash",
      imageSource: leash,
      price: "259",
      description: "",
      selected: false,
    },
    {
      productId: "14",
      prouctName: "Harness",
      imageSource: harnessCard,
      price: "759",
      selected: false,
      description: "",
    },
    {
      productId: "15",
      prouctName: "Collar",
      imageSource: collar,
      price: "259",
      selected: false,
      description:
        "Foodie Puppies Adjustable Nylon Tactical Dog Collar - (Green, Xtra-Large) for Large & Giant Dogs | Metal D-Ring with Strap Handle | Durable & Adjustable Collar for Dog Military Training",
    },
    {
      productId: "16",
      prouctName: "Poo Scooper",
      imageSource: scooper,
      price: "389",
      selected: false,
      description: "",
    },
  ];

  const user = useSelector((state: RootState) => state.finalState.user);
  const customerId = user.userId;

  // this row will be from DB for product details
  const [firstRowcard, setFirstRowcard] = useState(rowCard1);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const addTocart = (index: number, isFirstRow: ProductData[]) => {
    if (isFirstRow) {
      setFirstRowcard((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    }
    toast(
      `${
        firstRowcard[index].selected ? "Item removed from" : "Item added to"
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
        const itemId = `addedtoWishList${item.productId}`;

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
    return firstRowcard.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [firstRowcard, currentPage]);

  return (
    <div style={{ ...homeStyle.outerDiv, paddingLeft: "5%" }}>
      <Grid container spacing={3} key="gridOuter">
        {currentProducts?.map((card, index) => (
          <Grid item md={3} key={index}>
            <Card
              sx={{ maxWidth: "75%", maxHeight: "100%" }}
              key={index}
              data-testid={`product_${card.productId}`}
            >
              <CardActionArea style={{ height: "10rem", padding: 10 }}>
                <CardMedia sx={homeStyle.cardMedia} title={card.prouctName}>
                  <img
                    src={card.imageSource}
                    style={{ height: "100%", width: "auto" }}
                  />
                </CardMedia>
              </CardActionArea>
              <CardContent sx={homeStyle.cardContent}>
                <Typography>{card.prouctName}</Typography>
                <Typography>{`₹ ${card.price}.00`}</Typography>
              </CardContent>
              <CardActions sx={{ backgroundColor: "#00111c" }}>
                <Button
                  data-testid={`share_${card.productId}`}
                  style={homeStyle.IconButton}
                  onClick={() => handleShare(card.prouctName, card.price)}
                >
                  <ShareOutlinedIcon />
                </Button>
                <Button
                  data-testid={`wishlist_${card.productId}`}
                  onClick={() => addToWishlist(card)}
                  style={homeStyle.IconButton}
                >
                  {wishlistItems.includes(
                    `addedtoWishList${card.productId}`
                  ) ? (
                    <FavoriteIcon
                      style={{ color: "red" }}
                      data-testid={`FavoriteIcon_${card.productId}`}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      data-testid={`FavoriteBorderOutlinedIcon_${card.productId}`}
                    />
                  )}
                </Button>
                <Button
                  onClick={() => {
                    addTocart(index, firstRowcard);
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
          count={Math.ceil(firstRowcard.length / productsPerPage)}
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
