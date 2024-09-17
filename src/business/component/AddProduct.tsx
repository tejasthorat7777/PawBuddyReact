import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import {
  businessAddproduct,
  cartStyle,
  flexDiv,
  h100w100,
  homeStyle,
} from "../../commonFiles/commonTheme";
import { useState } from "react";
import { SendButton } from "../../commonFiles/SendButton";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { generateProductId } from "../../commonFiles/commonFunctions";
import { ProductData } from "../../commonFiles/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const getSubCategory = (subcat: string) => {
  switch (subcat) {
    case "Food": {
      return ["Dry Food", "Greavy Food", "Treats"];
    }
    case "Accessories": {
      return ["Leash", "Harness", "Collar"];
    }
    case "Shampoo": {
      return ["Shining Shampoo", "Tick and Fleas Shampoo", "Scented Shampoo"];
    }
    case "Bathroom": {
      return ["Toilet Spray", "Waste Scooper", "Fragnance Perfume"];
    }
    default: {
      return ["SubCatgory"];
    }
  }
};

const AddProduct = () => {
  const userId = useSelector(
    (state: RootState) => state.user.userId
  );
  const condition = ["Condition", "New", "Used", "Refurbished"];
  const category = ["category", "Food", "Accessories", "Shampoo", "Bathroom"];

  const [addProduct, setAddProduct] = useState<ProductData>({
    prodId: "",
    prodName: "",
    prodDiscrip: "",
    prodPrice: "",
    pordQuant: "",
    prodDiscount: "",
    prodBrand: "",
    prodWeight: "",
    prodConditon: condition[0],
    prodImg: "",
    selected: false,
    rating: 0,
    category: category[0],
    subCategory: getSubCategory(category[0])[0],
  });

  // setAddProduct({ ...addProduct, customerId: customerId });

  const [isLoading, setIsLoading] = useState(false);
  const [finalPrice, setFinalPrice] = useState("");

  const reset = () => {
    setAddProduct({
      prodId: "",
      prodName: "",
      prodDiscrip: "",
      prodPrice: "",
      pordQuant: "",
      prodDiscount: "",
      prodBrand: "",
      prodWeight: "",
      prodConditon: condition[0],
      prodImg: "",
      selected: false,
      rating: 0,
      category: category[0],
      subCategory: "SubCatgory",
    });
  };

  const dumpProduct = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/addProduct`, {
        customerId: userId,
        products: addProduct,
      });
    } catch (error) {
      console.error("Error while uploading product:", error);
      // TODO: Implement error handling, such as showing a Lottie animation
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAddProduct({ ...addProduct, prodImg: base64String });
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  const handleFinalPrice = (price: string, discount: string) => {
    const priceBeforeDis = Number(price) * Number(discount);
    const finalPrice = Number(price) - priceBeforeDis / 100;
    setFinalPrice(finalPrice.toString());
  };

  return (
    <div style={homeStyle.outerDiv}>
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : (
        <div style={businessAddproduct.outerDiv}>
          <div
            style={{
              height: "100%",
              width: "40%",
            }}
          >
            <div style={businessAddproduct.imgOuter}>
              {!addProduct.prodImg ? (
                <div style={businessAddproduct.uploadBtnDiv}>
                  <Button
                    style={businessAddproduct.uploadBtn}
                    component="label"
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      id="prodFile"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </div>
              ) : (
                <Card data-testid={`product_`}>
                  <CardActionArea sx={{ height: "17rem", ...flexDiv }}>
                    <CardMedia sx={{ height: "14rem", objectFit: "cover" }}>
                      <img
                        src={addProduct.prodImg}
                        style={cartStyle.imageStyle}
                      />
                    </CardMedia>
                  </CardActionArea>
                </Card>
              )}
            </div>
            <input
              type="text"
              name="Brand"
              data-testid="prodBrand"
              placeholder="Product Brand"
              autoComplete="off"
              value={addProduct.prodBrand}
              style={businessAddproduct.productBrand}
              onChange={(event) => {
                setAddProduct({
                  ...addProduct,
                  prodBrand: event.target.value,
                  prodId: generateProductId(12),
                });
              }}
            />
            <FormControl
              data-testid="selectForm"
              sx={{
                width: "50%",
              }}
              size="small"
              style={{ marginTop: "5%", color: "black" }}
            >
              <Select
                data-testid="prodCondition"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  fontFamily: "cursive",
                  color:
                    addProduct.prodConditon === "Condition" ? "grey" : "black",
                }}
                value={addProduct.prodConditon}
                style={{
                  backgroundColor: "white",
                }}
                onChange={(event) => {
                  setAddProduct({
                    ...addProduct,
                    prodConditon: event.target.value as string,
                  });
                }}
              >
                {condition.map((condition, index) => (
                  <MenuItem
                    sx={{ fontFamily: "cursive" }}
                    value={condition}
                    key={`condition_${condition}_${index}`}
                    data-testid={`condition_${condition}`}
                  >
                    {condition}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SendButton
              operationOnData={reset}
              text={"Cancel"}
              style={{
                top: "70%",
                left: "10%",
                backgroundColor: "#597081",
              }}
            />
            <SendButton
              operationOnData={dumpProduct}
              text={"Submit"}
              style={{
                top: "70%",
                left: "25%",
                backgroundColor: "#597081",
              }}
            />
          </div>
          <Container
            style={{
              width: "60%",
            }}
          >
            <input
              type="text"
              name="prodName"
              data-testid="prodName"
              placeholder="Product Name"
              autoComplete="off"
              value={addProduct.prodName}
              style={businessAddproduct.prodName}
              onChange={(event) => {
                setAddProduct({
                  ...addProduct,
                  prodName: event.target.value,
                });
              }}
            />
            <textarea
              name="prodDiscription"
              data-testid="prodDiscription"
              placeholder="Description of Product"
              autoComplete="off"
              value={addProduct.prodDiscrip}
              style={businessAddproduct.prodDiscrip}
              onChange={(event) => {
                setAddProduct({
                  ...addProduct,
                  prodDiscrip: event.target.value,
                });
              }}
            />
            <input
              type="text"
              name="price"
              data-testid="prodPrice"
              placeholder="Product Price (M.R.P.)"
              autoComplete="off"
              value={addProduct.prodPrice}
              style={businessAddproduct.prodPriceQuantWeight}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAddProduct({
                    ...addProduct,
                    prodPrice: value,
                  });
                }
              }}
            />
            <input
              type="text"
              name="Quant"
              data-testid="prodQuant"
              placeholder="Net Quantity"
              autoComplete="off"
              value={addProduct.pordQuant}
              style={{
                ...businessAddproduct.prodPriceQuantWeight,
                marginLeft: "10%",
              }}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAddProduct({
                    ...addProduct,
                    pordQuant: value,
                  });
                }
              }}
            />
            <input
              type="text"
              name="weight"
              data-testid="prodWeight"
              placeholder="Product Weight"
              autoComplete="off"
              value={addProduct.prodWeight}
              style={businessAddproduct.prodPriceQuantWeight}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAddProduct({
                    ...addProduct,
                    prodWeight: value,
                  });
                }
              }}
            />
            <input
              type="text"
              name="discount"
              data-testid="prodDiscont"
              placeholder="Discount in %"
              autoComplete="off"
              value={addProduct.prodDiscount}
              style={{
                ...businessAddproduct.prodPriceQuantWeight,
                marginLeft: "10%",
              }}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAddProduct({
                    ...addProduct,
                    prodDiscount: value,
                  });
                }
              }}
            />
            <FormControl
              data-testid="selectForm"
              sx={{
                width: "45%",
              }}
              size="small"
              style={{ marginTop: "3%", color: "black" }}
            >
              <Select
                data-testid="prodCategory"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  fontFamily: "cursive",
                  color: addProduct.category === "category" ? "grey" : "black",
                }}
                value={addProduct.category}
                style={{
                  backgroundColor: "white",
                }}
                onChange={(event) => {
                  setAddProduct({
                    ...addProduct,
                    category: event.target.value as string,
                    subCategory: getSubCategory(event.target.value)[0],
                  });
                }}
              >
                {category.map((cat, index) => (
                  <MenuItem
                    sx={{ fontFamily: "cursive" }}
                    value={cat}
                    key={`cat_${cat}_${index}`}
                    data-testid={`cat_${cat}`}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              data-testid="selectForm"
              sx={{
                width: "45%",
                marginLeft: "10%",
              }}
              size="small"
              style={{ marginTop: "3%", color: "black" }}
              disabled={addProduct.category === "category"}
            >
              <Select
                data-testid="prodSubCategory"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  fontFamily: "cursive",
                  color:
                    addProduct.subCategory === "Condition" ? "grey" : "black",
                }}
                value={addProduct.subCategory}
                style={{
                  backgroundColor: "white",
                }}
                onChange={(event) => {
                  setAddProduct({
                    ...addProduct,
                    subCategory: event.target.value as string,
                  });
                }}
              >
                {getSubCategory(addProduct.category)?.map(
                  (condition, index) => (
                    <MenuItem
                      sx={{ fontFamily: "cursive" }}
                      value={condition}
                      key={`condition_${condition}_${index}`}
                      data-testid={`condition_${condition}`}
                    >
                      {condition}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <div
              style={{
                ...businessAddproduct.finalPrice,
                color: finalPrice ? "black" : "grey",
              }}
            >
              {finalPrice || "Final Price after Discount per Product"}
              <SendButton
                operationOnData={() => {
                  handleFinalPrice(
                    addProduct.prodPrice,
                    addProduct.prodDiscount
                  );
                }}
                text={"Show"}
                style={{
                  top: "71%",
                  left: "82%",
                  backgroundColor: "#597081",
                }}
              />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
export default AddProduct;
