import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/userRoutes.js";
import { connectDB } from "./database/connect.js";
import cors from "cors";

dotenv.config();

// For ESM (import syntax)
import dns from "node:dns/promises";
import { errorhandler } from "./middleware/errorMiddleWare.js";
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
  res.send("ok");
});

app.use(errorhandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
