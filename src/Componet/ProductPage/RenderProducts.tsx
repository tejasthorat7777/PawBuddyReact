import React, { useMemo, useState } from "react";
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
import {
  getDiscountedPrice,
  isItemExists,
} from "../../commonFiles/commonFunctions";
import { homeStyle } from "../../commonFiles/commonTheme";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { iRenderProducts } from "../../commonFiles/commonTypes";

const RenderProducts: React.FC<iRenderProducts> = (props) => {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return props.products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [props.products, currentPage]);

  return (
    <>
      <Grid container spacing={2} key="gridOuter">
        {currentProducts.map((card, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2.4}
            xl={2}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
              }}
              key={index}
              data-testid={`product_${card.prodId}`}
            >
              <CardActionArea
                style={{ height: "10rem", padding: 10, flexShrink: 0 }}
              >
                <CardMedia sx={homeStyle.cardMedia} title={card.prodName}>
                  <img
                    src={card.prodImg}
                    style={{ height: "100%", width: "auto" }}
                  />
                </CardMedia>
              </CardActionArea>
              <CardContent
                sx={{
                  ...homeStyle.cardContent,
                  padding: "12px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    maxWidth: "60%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {card.prodName}
                </Typography>
                <Typography>{`₹ ${getDiscountedPrice(
                  card.prodPrice,
                  card.prodDiscount
                )}.00`}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  backgroundColor: "#00111c",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  data-testid={`share_${card.prodId}`}
                  style={homeStyle.IconButton}
                  onClick={() =>
                    props?.handleShare(card.prodName, card.prodPrice)
                  }
                >
                  <ShareOutlinedIcon />
                </Button>

                <Button
                  data-testid={`wishlist_${card.prodId}`}
                  onClick={() => props.addToWishlist(card)}
                  style={homeStyle.IconButton}
                >
                  {isItemExists(props.wishlistItems, card.prodId) ? (
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
                  onClick={() => props.addTocart(card)}
                  style={homeStyle.IconButton}
                >
                  {isItemExists(props.cartList, card.prodId) ? (
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
    </>
  );
};
export default RenderProducts;
