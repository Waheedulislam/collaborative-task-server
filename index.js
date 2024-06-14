const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://baoppyhossen1234:UWY0099dmVpPP5pz@cluster0.j1lf3mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Rout is working on time");
});

app.listen(port, (req, res) => {
  console.log("App is listening :", port);
});

// UWY0099dmVpPP5pz
