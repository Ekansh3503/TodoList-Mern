const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB 
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todolistDB";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Define the Item schema and model
const todoSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added validation
});

const Item = mongoose.model("Todo", todoSchema);

// Route to get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
});

// Route to add a new item
app.post("/api/items", async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Error adding item", error: error.message });
  }
});

// Route to update an item by ID
app.put("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
});


// Route to delete an item by ID
app.delete("/api/items/:id", async (req, res) => { // Changed to DELETE method
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


