import express from 'express';
import { profileCred } from '../../model/profileCred.js';
import { DemoSchema } from '../../model/demo.js';
import db from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors'


const server = express();
const PORT = 5173;

server.use(express.json());
server.use(cors());

server.get("/getUser", async (req, res) => {
  const user = {
    city: "Nashik",
    gender: "male",
    name: "Tejas",
    age: "45",
    breed: "indie",
    birthdate: "21/02/2022",
    owner: "tejas",
    identification: "mole",
    username: "valid",
    password: "asdfghj"
  }
  res.send(user)
})


server.post("/profile", async (req, res) => {
  try {
    const {msg} = req.body;
    const data = {
      msg:msg
    }
    await DemoSchema.insertMany([data])
    console.log("data send")
    res.status(200).json(data)
  } catch (error) {
    console.log("error>>>>>>>", error)
    res.status(500).json({ error: "internal Error" })
  }
})

server.get("/person", async (req, res) => {
  try {
    const data = await profileCred.find();
    console.log("data get")
    res.status(200).json(data);
  } catch (error) {
    console.log("error<<<<<", error)
    res.status(500).json({ error: "Internal error" })
  }
})

server.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});

export default server;

