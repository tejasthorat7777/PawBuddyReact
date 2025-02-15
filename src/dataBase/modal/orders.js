import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
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
      customerName: String,
      orderId: String,
      orderDate: String,
      prodDiscount: String,
    },
  ],
});

export const ordersInfo = mongoose.model("Orders", ordersSchema);
