import mongoose from "mongoose";

const dbUrl = 'mongodb+srv://tejasthorat7777:sjzvYxs3W2VlyhW6@pawbuddye.6avh4bl.mongodb.net/?retryWrites=true&w=majority&appName=PawBuddyE'
mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const db = mongoose.connection;
db.on('connected', () => {
    console.log("connected to mongDb")
})
export default db;