import express from "express";
import bodyParser from "body-parser";
import { UserInfo } from "../modal/userInfo.js";
import cors from "cors";
import mongoose from "mongoose";

const server = express();
const PORT = 3000;
server.use(cors());

server.use(bodyParser.json());

const dbUrl =
  "mongodb+srv://tejasthorat7777:sjzvYxs3W2VlyhW6@pawbuddye.6avh4bl.mongodb.net/?retryWrites=true&w=majority&appName=PawBuddyE";

try {
  mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

server.post("/sendUsersInfo", async (req, res) => {
  console.log("Received request body:", req.body);
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

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
