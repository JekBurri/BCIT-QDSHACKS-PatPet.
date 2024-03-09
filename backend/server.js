import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import express from "express";

const app = express();

app.use(express.json());

const PORT = 8000;

app.get("/", async (req, res) => {
  res.send("Hello World!");
});
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error("Failed to create a new user:", error);
    res.status(500).json({ error: "Failed to create a new user" });
  }
});

app.get("/pets/:user_id", async (req, res) => {
  const userId = parseInt(req.params.user_id);
  const pets = await prisma.pet.findMany({
    where: {
      userId: userId,
    },
  });
  res.json(pets);
});

app.post("/pets", async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newPet = await prisma.pet.create({
      data: {
        name,
        userId,
      },
    });
    res.json(newPet);
  } catch (error) {
    console.error("Failed to create a new pet:", error);
    res.status(500).json({ error: "Failed to create a new pet" });
  }
});

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
