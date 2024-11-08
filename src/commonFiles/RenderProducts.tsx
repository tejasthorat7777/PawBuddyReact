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
import { isItemExists } from "./commonFunctions";
import { homeStyle } from "./commonTheme";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { iRenderProducts } from "./commonTypes";

export const RenderProducts: React.FC<iRenderProducts> = (props) => {

  const productsPerPage = 8;
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
      <Grid container spacing={3} key="gridOuter">
        {currentProducts.map((card, index) => (
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
                  onClick={() =>
                    props?.handleShare(card.prodName, card.prodPrice)
                  }
                >
                  <ShareOutlinedIcon />
                </Button>
                <Button
                  data-testid={`wishlist_${card.prodId}`}
                  id={`wishlist_${card.prodId}`}
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
                  onClick={() => {
                    props.addTocart(card);
                  }}
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
      <Container style={homeStyle.PaginationDiv}>
        <Pagination
          shape="rounded"
          color="primary"
          count={Math.ceil(props.products.length / productsPerPage)}
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
  );
};
