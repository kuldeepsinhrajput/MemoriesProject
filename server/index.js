
import bodyParser from "body-parser";
import core from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(core());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));


