import bodyParser from "body-parser";
import core from "cors";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(core());
app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://Kuldeep:test1@cluster0.4daobfg.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5050;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
