import "dotenv/config";
import cors from "cors";
import express from "express";
import { categoriesRouter } from "./routes/categories.js";
import { productsRouter } from "./routes/products.js";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
