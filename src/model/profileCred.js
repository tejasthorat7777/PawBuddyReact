import mongoose from "mongoose";

const profileScheme = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const profileCred = mongoose.model('profileCred', profileScheme);
