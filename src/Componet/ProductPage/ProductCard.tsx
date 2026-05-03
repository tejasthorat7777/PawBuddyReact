import {
  Card,
  IconButton,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  isItemExists,
  getDiscountedPrice,
} from "../../commonFiles/commonFunctions";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { iProductCard } from "../../commonFiles/commonTypes";

const productCardStyles = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    position: "relative",
    borderRadius: "32px",
    backgroundColor: "#fff8e5",
    boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
    transition: "transform 200ms ease, box-shadow 200ms ease",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 24px 55px rgba(0,0,0,0.18)",
    },
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    bgcolor: "#ffbe0b",
    color: "#1f1f1f",
    px: 1.3,
    py: 0.5,
    borderRadius: "999px",
    fontSize: 11,
    fontWeight: 700,
    zIndex: 2,
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    bgcolor: "rgba(255,255,255,0.95)",
    borderRadius: "50%",
    boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
    color: "#1f1f1f",
    zIndex: 2,
  },
  mediaWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10rem",
    overflow: "hidden",
  },
  media: {
    p: 1,
    height: "95%",
    width: "auto",
    objectFit: "contain",
    display: "block",
  },
  content: {
    px: 1.5,
    pt: 1.5,
    pb: 0,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    bgcolor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#121212",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  ratingRow: {
    alignItems: "center",
    gap: 0.5,
    color: "#5f5f5f",
    fontSize: 13,
  },
  priceRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 1,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: 800,
    color: "#111111",
  },
  oldPrice: {
    fontSize: 13,
    color: "#8c8c8c",
    textDecoration: "line-through",
  },
  addButton: {
    width: "100%",
    mt: 1.5,
    borderRadius: "999px",
    height: 44,
    backgroundColor: "#3b2a1f",
    color: "#ffffff",
    textTransform: "none",
    fontWeight: 700,
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#4d3b2b",
    },
  },
};

const ProductCard: React.FC<iProductCard> = (props) => {
  const { card, addToWishlist, addTocart, wishlistItems } = props;
  return (
    <Card sx={productCardStyles.card} data-testid={`product_${card.prodId}`}>
      <Box sx={productCardStyles.badge}>Best Seller</Box>
      <IconButton
        aria-label="toggle wishlist"
        sx={productCardStyles.favorite}
        onClick={() => addToWishlist(card)}
        data-testid={`wishlist_${card.prodId}`}
      >
        {isItemExists(wishlistItems, card.prodId) ? (
          <FavoriteIcon sx={{ color: "#ff5151", fontSize: 18 }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>

      <CardActionArea>
        <Box sx={productCardStyles.mediaWrapper}>
          <CardMedia
            component="img"
            image={card.prodImg}
            alt={card.prodName}
            sx={productCardStyles.media}
          />
        </Box>
      </CardActionArea>

      <CardContent sx={productCardStyles.content}>
        <Stack direction="row" sx={productCardStyles.ratingRow}>
          <StarRateIcon sx={{ fontSize: 16, color: "#ffb703" }} />
          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
            {card.rating.toFixed(1)}
          </Typography>
          <Typography sx={{ color: "#7a7a7a" }}>
            (
            {card.rating > 0
              ? `${Math.round(card.rating * 50)} reviews`
              : "New"}
            )
          </Typography>
        </Stack>

        <Typography sx={productCardStyles.title}>{card.prodName}</Typography>

        <Box sx={productCardStyles.priceRow}>
          <Typography sx={productCardStyles.currentPrice}>
            {`₹ ${getDiscountedPrice(card.prodPrice, card.prodDiscount)}.00`}
          </Typography>
          {!!Number(card.prodDiscount) && (
            <Typography sx={productCardStyles.oldPrice}>
              {`₹ ${card.prodPrice}.00`}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          sx={productCardStyles.addButton}
          startIcon={<AddShoppingCartOutlinedIcon />}
          onClick={() => addTocart(card)}
          data-testid={`cart_${card.prodId}`}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
