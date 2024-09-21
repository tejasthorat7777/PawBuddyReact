import express from "express";
import bodyParser from "body-parser";
import { UserInfo } from "./modal/userInfo.js";
import cors from "cors";
import mongoose from "mongoose";
import { wishlistInfo } from "./modal/wishlist.js";
import { Products } from "./modal/product.js";
import { cartList } from "./modal/cart.js";
import { ordersInfo } from "./modal/orders.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();
const PORT = 3000;
server.use(cors());

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

// ######################################### POST METHODS #####################################################

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

server.post("/wishlist/remove", async (req, res) => {
  try {
    const { customerId, prodId } = req.body;

    const updatedWishlist = await wishlistInfo.findOneAndUpdate(
      { customerId },
      { $pull: { items: { prodId } } },
      { new: true }
    );

    res.status(200).json({
      message: "Item removed from wishlist successfully!",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    res.status(500).json({ message: "Error removing item" });
  }
});

server.post("/wishlist/dumped", async (req, res) => {
  try {
    const {
      customerId,
      prodId,
      prodName,
      prodPrice,
      prodDiscrip,
      prodImg,
      selected,
    } = req.body;

    const newItem = {
      prodId,
      prodName,
      prodPrice,
      prodDiscrip,
      prodImg,
      selected,
    };

    const customerWishlist = await wishlistInfo.findOne({ customerId });
    const productExists = customerWishlist?.items.some(
      (item) => item.prodId === prodId
    );

    if (productExists) {
      return res.status(200).json({
        message: "Item already in wishlist",
        wishlist: customerWishlist,
      });
    }

    const updatedWishlist = await wishlistInfo.findOneAndUpdate(
      { customerId },
      { $push: { items: newItem } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Item added to wishlist successfully!",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Error submitting item" });
  }
});

server.post("/addProduct", async (req, res) => {
  try {
    const { customerId, products } = req.body;
    const existingCustomer = await Products.findOne({ customerId });

    if (existingCustomer) {
      existingCustomer.products.push(products);
      await existingCustomer.save();
    } else {
      const newProduct = new Products({ customerId, products: products });
      await newProduct.save();
    }

    res.status(200).json({ message: "Product(s) added successfully!" });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ message: "Failed to upload product", error });
  }
});

server.post("/cart/dumped", async (req, res) => {
  try {
    const { customerId, prodId, prodPrice, prodDiscrip, prodImg, rating } =
      req.body;

    const newItem = {
      customerId,
      prodId,
      prodPrice,
      prodDiscrip,
      prodImg,
      rating,
    };

    const customerCartList = await cartList.findOne({ customerId });
    const productExists = customerCartList?.items.some(
      (item) => item.prodId === prodId
    );

    if (productExists) {
      return res.status(200).json({
        message: "Item already in wishlist",
        cartList: customerCartList,
      });
    }

    const updatedCartlist = await cartList.findOneAndUpdate(
      { customerId },
      { $push: { items: newItem } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Item added to wishlist successfully!",
      cartList: updatedCartlist,
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Error submitting item" });
  }
});

server.post("/cart/remove", async (req, res) => {
  try {
    const { customerId, prodId } = req.body;

    const updateCartlist = await cartList.findOneAndUpdate(
      { customerId },
      { $pull: { items: { prodId } } },
      { new: true }
    );

    res.status(200).json({
      message: "Item removed from wishlist successfully!",
      cartlist: updateCartlist,
    });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    res.status(500).json({ message: "Error removing item" });
  }
});

server.post("/orders/dumped", async (req, res) => {
  try {
    const {
      customerId,
      prodId,
      prodPrice,
      prodDiscrip,
      prodImg,
      orderId,
      customerName,
      orderDate,
    } = req.body;

    const newItem = {
      customerId,
      prodId,
      prodPrice,
      prodDiscrip,
      prodImg,
      orderId,
      customerName,
      orderDate,
    };

    const updatedOrderslist = await ordersInfo.findOneAndUpdate(
      { customerId },
      { $push: { items: newItem } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Item added to orders successfully!",
      cartList: updatedOrderslist,
    });
  } catch (error) {
    console.error("Error updating orders:", error);
    res.status(500).json({ message: "Error submitting item" });
  }
});

// ######################################### GET METHODS #####################################################

server.get("/getUsersInfo/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserInfo.findOne({ username });
    res.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

server.get("/wishlist/get/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const wishlist = await wishlistInfo.findOne({ customerId });
    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
});

server.get("/getProducts", async (req, res) => {
  try {
    const getProduct = await Products.find();
    res.status(200).json(getProduct);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
});

server.get("/cart/get/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const cartListItems = await cartList.findOne({ customerId });
    if (!cartListItems) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cartListItems);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
});

server.get("/busi/getProducts/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    let getProduct;
    if (customerId) {
      getProduct = await Products.find({ customerId });
    }
    res.status(200).json(getProduct);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

server.get("/orders/get/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const orders = await ordersInfo.findOne({ customerId });
    if (!orders) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
});
