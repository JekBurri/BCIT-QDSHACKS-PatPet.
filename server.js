import express from "express";
import fs from "fs";
import path from "path";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = 8000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const DIST_DIR_PATH = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR_PATH));

const DATA_FILE_PATH = path.join(__dirname, "data.json");

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    return null;
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to data file:", error);
  }
};

app.post("/events", (req, res) => {
  const { event } = req.body;
  const data = readData();
  if (data) {
    data.events.push(event);
    writeData(data);
    res.json({ message: "Event added successfully", event });
  } else {
    res.status(500).json({ error: "Failed to add event" });
  }
});

app.get("/events", (req, res) => {
  const data = readData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: "Failed to read events" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR_PATH, "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
);
