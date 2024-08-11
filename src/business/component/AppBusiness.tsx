import {
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
          <Card
            data-testid={`product_`}
            style={{
              border: "2px solid black",
            }}
          >
            <CardActionArea sx={{ height: "17rem", ...flexDiv }}>
              <CardMedia sx={{ height: "14rem", objectFit: "cover" }}>
                <img src={k9} style={cartStyle.imageStyle} />
              </CardMedia>
            </CardActionArea>
          </Card>
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
