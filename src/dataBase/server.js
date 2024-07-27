import express from "express";
import bodyParser from "body-parser";
import { UserInfo } from "./modal/userInfo.js";
import cors from "cors";
import mongoose from "mongoose";
import { wishlistInfo } from "./modal/wishlist.js";

const server = express();
const PORT = 3000;
server.use(cors());

server.use(bodyParser.json());

const dbUrl = "mongodb+srv://tejasthorat7777:pettey@pawbuddye.6avh4bl.mongodb.net/?retryWrites=true&w=majority&appName=PawBuddyE"
try {
  mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error); 
}

server.post("/sendUsersInfo", async (req, res) => {
  const information = req.body;
  try {
    const newUser = new UserInfo(information);
    await newUser.save();
    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error submitting user data" });
  }
});

server.get("/getUsersInfo", async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

server.post("/wishlist/remove", async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    const updatedWishlist = await wishlistInfo.findOneAndUpdate(
      { customerId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    res.status(200).json({ message: "Item removed from wishlist successfully!", wishlist: updatedWishlist });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    res.status(500).json({ message: "Error removing item" });
  }
});

server.post("/wishlist/dumped", async (req, res) => {
  try {
    const { customerId, productId, productName, price, description, imageSource, selected } = req.body;

    const newItem = {
      productId,
      productName,
      price,
      description,
      imageSource,
      selected,
    };

    const customerWishlist = await wishlistInfo.findOne({ customerId });
    const productExists = customerWishlist?.items.some(item => item.productId === productId);

    if (productExists) {
      return res.status(200).json({ message: "Item already in wishlist", wishlist: customerWishlist });
    }

    const updatedWishlist = await wishlistInfo.findOneAndUpdate(
      { customerId },
      { $push: { items: newItem } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Item added to wishlist successfully!", wishlist: updatedWishlist });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Error submitting item" });
  }
});

server.get("/wishlist/get/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const wishlist = await wishlistInfo.findOne({ customerId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

