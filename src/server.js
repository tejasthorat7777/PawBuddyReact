import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const connectDb = async () => {
  await mongoose.connect('mongodb+srv://tejasthorat7777:sjzvYxs3W2VlyhW6@pawbuddye.6avh4bl.mongodb.net/?retryWrites=true&w=majority&appName=PawBuddyE')
  console.log(`connectDb is connection with ${mongoose.connection.host}`)
}
connectDb();


server.listen(PORT, () => {
  console.log("server is running");
});

export default server;
