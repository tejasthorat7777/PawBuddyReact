import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: String,
      prouctName: String,
      price: String,
      description: String,
      imageSource: String,
      selected: Boolean,
    },
  ],
});

export const wishlistInfo = mongoose.model("Wishlist", wishlistSchema);
