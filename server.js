const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const mongoURI = "mongodb://localhost:27017/";
var db;

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, dbClient) => {
  if (err) throw err;
  db = dbClient.db("contact-database");
  console.log("connected to mongodb server");
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// read
app.get("/contacts", (req, res) => {
  db.collection("contacts")
    .find({})
    .toArray((err, contacts) => {
      if (err) throw err;
      res.send(contacts);
    });
});

// create
app.post("/contacts/create", (req, res) => {
  db.collection("contacts").insertOne(req.body, (err) => {
    if (err) throw err;
    console.log("contact created");
    res.end();
  });
});

// update
app.put("/contacts/update", (req, res) => {
  const { _id, ...rest } = req.body;
  db.collection("contacts").updateOne(
    { _id: ObjectID(_id) },
    { $set: rest },
    (err) => {
      if (err) throw err;
      console.log("contact updated");
      res.end();
    }
  );
});

//delete
app.delete("/contacts/delete", (req, res) => {
  db.collection("contacts").deleteOne(
    { _id: ObjectID(req.body._id) },
    (err) => {
      if (err) throw err;
      console.log("contact deleted");
    }
  );
});

app.listen(3001, () => {
  console.log("server is up and running...");
});
