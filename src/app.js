import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: false,
  })
);

app.use(express.json());

app.use(routes);

app.use((req, res) => {
  return res.status(404).json({
    error: "Rota não encontrada",
  });
});

export default app;