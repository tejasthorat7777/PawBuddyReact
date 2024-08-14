import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
  prodName: String,
  prodDiscrip: String,
  prodConditon: String,
  prodBrand: String,
  prodImg: String,
  prodPrice: Number,
  prodQuantity: Number,
  prodWeight: Number,
  prodDiscount: Number,
});

export const AddProduct = mongoose.model("addProduct", addProductSchema);
