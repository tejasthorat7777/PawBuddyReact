import {
  ButtonBase,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { cartStyle, flexDiv, homeStyle } from "../../commonFiles/commonTheme";
import k9 from "../../assets/K9Harness.jpg";
import pd from "../../assets/adultPedegree.jpg";
import { useEffect, useState } from "react";
import { SendButton } from "../../commonFiles/SendButton";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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

const AppBusiness = () => {
  const condition = ["Condition", "New", "Used", "Refurbished"];
  const [addProduct, setAddProduct] = useState({
    prodName: "",
    prodDiscrip: "",
    prodPrice: 0,
    pordQuant: 0,
    prodDiscount: 0,
    prodBrand: "",
    prodWeight: 0,
    prodConditon: condition[0],
    prodImg: "",
  });

  const reset = () => {
    setAddProduct({
      prodName: "",
      prodDiscrip: "",
      prodPrice: 0,
      pordQuant: 0,
      prodDiscount: 0,
      prodBrand: "",
      prodWeight: 0,
      prodConditon: condition[0],
      prodImg: "",
    });
  };

  const dumpProduct = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // try {
    //   event.preventDefault();
    //   setIsloading(true);
    //   await axios.post("http://localhost:3000/sendUsersInfo", userData);
    //   setTimeout(() => {
    //     setIsloading(false);
    //   }, 3000);
    //   setFormSend(true);
    // } catch (error) {
    //   console.log("Error>>>>", error);
    //   setIsloading(false);
    //   setUploadError(true);
    // }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // need to change this logic
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddProduct({ ...addProduct, prodImg: reader.result as string });
      };
      const data = reader.readAsDataURL(file);
        }
  };

  return (
    <div style={homeStyle.outerDiv}>
      <div
        style={{
          backgroundColor: "#00111c",
          height: "80%",
          padding: "2%",
          marginTop: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
          }}
        >
          <div
            style={{
              height: "65%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            {!addProduct.prodImg ? (
              <div style={{ ...flexDiv, height: "100%", width: "100%" }}>
                <Button
                  style={{
                    height: "100%",
                    borderRadius:"10px",
                    width: "100%",
                  }}
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
            name="Owner"
            data-testid="owner"
            placeholder="Product Brand"
            autoComplete="off"
            value={addProduct.prodBrand}
            style={{
              width: "45%",
              backgroundColor: "white",
              height: "10%",
              marginTop: "5%",
              color: "black",
              marginRight: "5%",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({ ...addProduct, prodBrand: event.target.value });
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
                  key={`city_${condition}_${index}`}
                  data-testid={`city_${condition}`}
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
              left: "20%",
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
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "10%",
              color: "black",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({ ...addProduct, prodName: event.target.value });
            }}
          />
          <textarea
            name="prodDiscription"
            data-testid="prodDiscription"
            placeholder="Description of Product"
            autoComplete="off"
            value={addProduct.prodDiscrip}
            style={{
              marginTop: "3%",
              height: "40%",
              width: "100%",
              backgroundColor: "white",
              resize: "none",
              padding: "2%",
              boxSizing: "border-box",
              fontFamily: "cursive",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({ ...addProduct, prodDiscrip: event.target.value });
            }}
          />
          <input
            type="text"
            name="price"
            data-testid="prodPrice"
            placeholder="Product Price (M.R.P.)"
            autoComplete="off"
            value={addProduct.prodPrice === 0 ? "" : addProduct.prodPrice}
            style={{
              width: "45%",
              backgroundColor: "white",
              height: "10%",
              marginTop: "3%",
              color: "black",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({
                ...addProduct,
                prodPrice: Number(event.target.value),
              });
            }}
          />
          <input
            type="text"
            name="Quant"
            data-testid="prodQuant"
            placeholder="Net Quantity"
            autoComplete="off"
            value={addProduct.pordQuant === 0 ? "" : addProduct.pordQuant}
            style={{
              width: "45%",
              marginLeft: "10%",
              backgroundColor: "white",
              height: "10%",
              color: "black",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({
                ...addProduct,
                pordQuant: Number(event.target.value),
              });
            }}
          />
          <input
            type="text"
            name="weight"
            data-testid="prodWeight"
            placeholder="Product Weight"
            autoComplete="off"
            value={addProduct.prodWeight === 0 ? "" : addProduct.prodWeight}
            style={{
              width: "45%",
              backgroundColor: "white",
              height: "10%",
              marginTop: "3%",
              color: "black",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({
                ...addProduct,
                prodWeight: Number(event.target.value),
              });
            }}
          />
          <input
            type="text"
            name="discount"
            data-testid="prodDiscont"
            placeholder="Discount in %"
            autoComplete="off"
            value={addProduct.prodDiscount === 0 ? "" : addProduct.prodDiscount}
            style={{
              width: "45%",
              marginLeft: "10%",
              backgroundColor: "white",
              height: "10%",
              color: "black",
              borderRadius: "5px",
            }}
            onChange={(event) => {
              setAddProduct({
                ...addProduct,
                prodDiscount: Number(event.target.value),
              });
            }}
          />
        </Container>
      </div>
    </div>
  );
};
export default AppBusiness;
