const request = require("supertest");
const { app } = require("../src/app");

describe("API (Jest)", () => {
  test("GET /users => 200 y lista", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("POST /login inválido => 400", async () => {
    const res = await request(app).post("/login").send({ email: "bad", password: "123" });
    expect(res.status).toBe(400);
  });

  test("POST /login credenciales inválidas => 401", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  test("POST /login válido => 200", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("POST /products válido => 201", async () => {
    const res = await request(app).post("/products").send({ name: "Keyboard", price: 1234.5, stock: 2 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
  });

  test("POST /products inválido => 400", async () => {
    const res = await request(app).post("/products").send({ name: "K", price: 0, stock: -1 });
    expect(res.status).toBe(400);
  });
});
