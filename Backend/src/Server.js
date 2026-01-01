import express from "express";
import NotesRouter from "./Routes/Notes.js";
import { connectDB } from "./Config/DB.js";
import dotenv from "dotenv";
import RateLimiter from "./Middleware/RateLimiter.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(RateLimiter);
app.use("/api/notes", NotesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// CYjspCq5dbf2LZJo
