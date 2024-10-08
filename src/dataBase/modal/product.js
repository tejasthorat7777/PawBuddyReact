import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      prodId: String,
      prodName: String,
      prodDiscrip: String,
      prodConditon: String,
      prodBrand: String,
      prodImg: String,
      prodPrice: String,
      pordQuant: String,
      prodWeight: String,
      prodDiscount: String,
      selected: Boolean,
      rating: Number,
      category: String,
      subCategory: String,
    },
  ],
});

export const Products = mongoose.model("products", productSchema);
