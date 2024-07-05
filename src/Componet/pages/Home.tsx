import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
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
import { homeStyle, flexDiv } from "../../commonFiles/commonTheme";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { useState } from "react";
import { ProductData } from "../../commonFiles/commonTypes";
import { useDispatch } from "react-redux";
import { wishlistItem } from "../../redux/Slice/Slices";

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
  ];
  const rowCard2: ProductData[] = [
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
  ];

  // this row will be from DB for product details
  const [firstRowcard, setFirstRowcard] = useState(rowCard1);
  const [secondRowcard, setSecondRowcard] = useState(rowCard2);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const dispatch = useDispatch();

  const addTocart = (index: number, isFirstRow: ProductData[]) => {
    if (isFirstRow) {
      setFirstRowcard((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    } else {
      setSecondRowcard((prevState) =>
        prevState.map((item, idx) =>
          idx === index ? { ...item, selected: !item.selected } : item
        )
      );
    }
    toast(
      `${
        isFirstRow
          ? firstRowcard[index].selected
            ? "Item removed from"
            : "Item added to"
          : secondRowcard[index].selected
          ? "Item removed from"
          : "Item added to"
      } Cart`
    );
  };

  const addToWishlist = (item: ProductData) => {
    const itemId = `addedtoWishList${item.productId}`;

    if (!wishlistItems.includes(itemId)) {
      setWishlistItems([...wishlistItems, itemId]);
      dispatch(wishlistItem({ item }));
      toast("Item added to Wishlist", {
        autoClose: 1000,
      });
    } else {
      setWishlistItems(wishlistItems.filter((id) => id !== itemId));
      toast("Item removed from Wishlist", {
        autoClose: 1000,
      });
    }
  };

  const handleShare = async (title: string, price: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this ${title} for just ₹ ${price}.00`,
          url: window.location.href,
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      console.error("Web Share API not supported in this browser");
    }
  };

  return (
    <div style={homeStyle.outerDiv}>
      <div style={homeStyle.commonDiv}>
        {firstRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: "15rem" }} key={index}>
            <CardActionArea style={{ height: "12rem", padding: 10 }}>
              <CardMedia sx={homeStyle.cardMedia} title={cardObject.prouctName}>
                <img
                  src={cardObject.imageSource}
                  style={{ height: "100%", width: "auto" }}
                />
              </CardMedia>
            </CardActionArea>
            <CardContent sx={homeStyle.cardContent}>
              <Typography>{cardObject.prouctName}</Typography>
              <Typography>{`₹ ${cardObject.price}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              <Button
                style={homeStyle.IconButton}
                onClick={() =>
                  handleShare(cardObject.prouctName, cardObject.price)
                }
              >
                <ShareOutlinedIcon />
              </Button>
              <Button
                onClick={() => addToWishlist(cardObject)}
                style={homeStyle.IconButton}
              >
                {wishlistItems.includes(
                  `addedtoWishList${cardObject.productId}`
                ) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </Button>
              <Button
                onClick={() => {
                  addTocart(index, firstRowcard);
                }}
                style={homeStyle.IconButton}
              >
                {cardObject.selected ? <DoneIcon /> : <AddIcon />}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div
        style={{
          ...homeStyle.commonDiv,
          marginTop: "1rem",
        }}
      >
        {secondRowcard.map((cardObject, index) => (
          <Card sx={{ maxWidth: 220 }} key={index}>
            <CardActionArea style={{ height: "12rem", padding: 10 }}>
              <CardMedia
                style={{
                  height: "100%",
                  objectFit: "cover",
                  ...flexDiv,
                }}
                title={cardObject.prouctName}
              >
                <img
                  src={cardObject.imageSource}
                  style={{ height: "100%", width: "auto" }}
                />
              </CardMedia>
            </CardActionArea>
            <CardContent sx={homeStyle.cardContent}>
              <Typography>{cardObject.prouctName}</Typography>
              <Typography>{`₹ ${cardObject.price}.00`}</Typography>
            </CardContent>
            <CardActions sx={{ backgroundColor: "#00111c" }}>
              <Button style={homeStyle.IconButton}>
                <ShareOutlinedIcon />
              </Button>
              <Button
                onClick={() => addToWishlist(cardObject)}
                style={homeStyle.IconButton}
              >
                {wishlistItems.includes(
                  `addedtoWishList${cardObject.productId}`
                ) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </Button>
              <Button
                onClick={() => addTocart(index, secondRowcard)}
                style={homeStyle.IconButton}
              >
                {cardObject.selected ? <DoneIcon /> : <AddIcon />}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Container style={homeStyle.PaginationDiv}>
        <Pagination
          shape="rounded"
          color="primary"
          count={10}
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
