import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRouter from "./router/UserRouter.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

//teste

//se existir o banco, ele conecta. Se não existir, ele cria
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((error) => {
    console.error("Error to connected to database: " + error.message);
  });

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
