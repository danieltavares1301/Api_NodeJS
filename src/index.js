import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import UserRouter from "./router/UserRouter.js";
import { AuthMiddleware } from "./middleware/auth.middleware.js";
import ShortnerRouter from "./router/ShortnerRouter.js";

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
app.use(ShortnerRouter);
app.use(AuthMiddleware);
app.use(UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// middleware é uma função que executa entre o começo e o fim de um requisição
