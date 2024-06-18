import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  city: String,
  gender: String,
  name: String,
  age: String,
  breed: String,
  birthdate: String,
  owner: String,
  identification: String,
  username: String,
  password: String,
});

export const UserInfo = mongoose.model("User", userSchema);
