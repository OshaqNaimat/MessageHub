import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/userRoutes.js";
import { errorhandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./database/connect.js";
import cors from "cors";

dotenv.config();

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
