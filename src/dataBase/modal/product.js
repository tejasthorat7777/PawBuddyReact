import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prodId: String,
  prodName: String,
  prodDiscrip: String,
  prodConditon: String,
  prodBrand: String,
  prodImg: String,
  prodPrice: String,
  prodQuantity: String,
  prodWeight: String,
  prodDiscount: String,
  selected: Boolean,
  rating: Number,
});

export const Products = mongoose.model("products", productSchema);
