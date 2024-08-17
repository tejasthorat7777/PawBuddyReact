import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      prodId: String,
      prodName: String,
      prodDiscrip: String,
      prodImg: String,
      prodPrice: String,
      selected: Boolean,
    },
  ],
});

export const wishlistInfo = mongoose.model("Wishlist", wishlistSchema);
