import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

const allowedOrigins = [
  "http://localhost:9000",
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Não permitido pelo CORS"));
    },
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