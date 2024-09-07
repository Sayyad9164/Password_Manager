import express from "express";
import "dotenv/config";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const app = express();
app.use(bodyParser.json())
app.use(cors())

client.connect();

app.get("/", async (req, res) => {
    const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a password
app.post("/", async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
});

// Delete a password
app.delete("/", async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
});


app.listen(8000, () => {
  console.log(`Server is listening at http://localhost:8000`);
});
