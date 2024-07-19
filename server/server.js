import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.route.js";

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth/", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode: statusCode,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ` + port);
});
