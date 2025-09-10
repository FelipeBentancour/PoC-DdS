const express = require("express");
const { z } = require("zod");

const app = express();
app.use(express.json());

// Datos en memoria
const users = [
  { id: 1, email: "alice@example.com", role: "user" },
  { id: 2, email: "bob@example.com", role: "admin" }
];
const products = [];

// Schemas
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const ProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative()
});

// Endpoints
app.get("/users", (_req, res) => {
  res.status(200).json({ data: users });
});

app.post("/login", (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password } = parsed.data;
  const exists = users.find(u => u.email === email);
  if (!exists || password !== "secret123") return res.status(401).json({ error: "invalid credentials" });

  res.status(200).json({ ok: true, user: { id: exists.id, email: exists.email } });
});

app.post("/products", (req, res) => {
  const body = { ...req.body, price: Number(req.body.price), stock: Number(req.body.stock) };
  const parsed = ProductSchema.safeParse(body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const item = { id: products.length + 1, ...parsed.data };
  products.push(item);
  res.status(201).json({ data: item });
});

// ping
app.get("/health", (_req, res) => res.status(200).send("ok"));

module.exports = { app };
