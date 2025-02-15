import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      prodId: String,
      prodDiscrip: String,
      prodImg: String,
      prodPrice: String,
      rating: Number,
      prodDiscount: String,
      prodName: String,
    },
  ],
});

export const cartList = mongoose.model("cartList", cartSchema);
