import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "studentDB";

let students;

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db(dbName);
  students = db.collection("students");
}
connectDB();

// ROUTES

app.post("/students", async (req, res) => {
  const result = await students.insertOne(req.body);
  res.send(result);
});

app.get("/students", async (req, res) => {
  const data = await students.find().toArray();
  res.send(data);
});

app.put("/students/:id", async (req, res) => {
  const result = await students.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.send(result);
});

app.delete("/students/:id", async (req, res) => {
  const result = await students.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
