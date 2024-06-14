const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    // task
    const taskDB = client.db("taskDB");
    const taskCollection = taskDB.collection("taskCollection");
    // Ongoing
    const ongoingDB = client.db("ongoingDB");
    const ongoingCollection = ongoingDB.collection("ongoingCollection");
    // Completed
    const completedDB = client.db("completedDB");
    const completedCollection = completedDB.collection("completedCollection");

    ////////////////////// task Collection //////////////////////

    //task create input field post
    app.post("/task", async (req, res) => {
      const taskData = req.body;

      const result = await taskCollection.insertOne(taskData);

      res.send(result);
    });

    // Get
    app.get("/task", async (req, res) => {
      const taskData = taskCollection.find();
      const result = await taskData.toArray();

      res.send(result);
    });
    //patch
    app.patch("/task/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const taskData = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(taskData);
    });
    // delete
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    ////////////////////// Ongoing  Collection //////////////////////

    //Ongoing create input field post
    app.post("/ongoing", async (req, res) => {
      const ongoingData = req.body;

      const result = await ongoingCollection.insertOne(ongoingData);

      res.send(result);
    });

    // Get
    app.get("/ongoing", async (req, res) => {
      const ongoingData = ongoingCollection.find();
      const result = await ongoingData.toArray();

      res.send(result);
    });
    //patch
    app.patch("/ongoing/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const ongoingData = await ongoingCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(ongoingData);
    });
    // delete
    app.delete("/ongoing/:id", async (req, res) => {
      const id = req.params.id;
      const result = await ongoingCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    ////////////////////// Completed  Collection //////////////////////

    //Ongoing create input field post
    app.post("/completed", async (req, res) => {
      const completedData = req.body;

      const result = await completedCollection.insertOne(completedData);

      res.send(result);
    });

    // Get
    app.get("/completed", async (req, res) => {
      const completedData = completedCollection.find();
      const result = await completedData.toArray();

      res.send(result);
    });
    //patch
    app.patch("/completed/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const completedData = await completedCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(completedData);
    });
    // delete
    app.delete("/completed/:id", async (req, res) => {
      const id = req.params.id;
      const result = await completedCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Rout is working okh");
});

app.listen(port, (req, res) => {
  console.log("App is listening :", port);
});

// UWY0099dmVpPP5pz
