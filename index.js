import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

const app = express();

console.log("MONGO_URI ", process.env.MONGO_URI);

app.use("/api/v1/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server Running at 5000");
});
