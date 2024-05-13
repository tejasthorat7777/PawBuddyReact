import mongoose from "mongoose";

const profileScheme = new mongoose.Schema({
    city: String,
    gender: String,
    name: String,
    age: String,
    breed: String,
    birthdate: String,
    owner: String,
    identification: String,
    username: String,
    password: String
})

const ProfileCred = mongoose.model('profileCred', profileScheme);
module.exports = {ProfileCred};
