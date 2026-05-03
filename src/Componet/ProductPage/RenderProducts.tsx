import React, { useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { iRenderProducts } from "../../commonFiles/commonTypes";
import ProductCard from "./ProductCard";

const RenderProducts: React.FC<iRenderProducts> = (props) => {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

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
            xs={12}
            sm={6}
            md={8}
            lg={3}
            xl={2}
            key={index}
            sx={{ display: "flex" }}
          >
            <ProductCard
              card={card}
              addToWishlist={props.addToWishlist}
              addTocart={props.addTocart}
              wishlistItems={props.wishlistItems}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default RenderProducts;
