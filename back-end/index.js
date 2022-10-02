import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

//router
app.use("/api/blogs", router)

const DB_CONNECTION = process.env.MONGODB_URL;
const PORT = process.env.PORT;


mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connect successfully in ${DB_CONNECTION}`);
      console.log(`Server running in http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
