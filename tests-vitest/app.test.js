const request = require("supertest");

const { app } = require("../src/app");

describe("API (Vitest)", () => {
  it("GET /users => 200 y lista", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /login inválido => 400", async () => {
    const res = await request(app).post("/login").send({ email: "bad", password: "123" });
    expect(res.status).toBe(400);
  });

  it("POST /login credenciales inválidas => 401", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("POST /login válido => 200", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("POST /products válido => 201", async () => {
    const res = await request(app).post("/products").send({ name: "Mouse", price: 999.9, stock: 5 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
  });

  it("POST /products inválido => 400", async () => {
    const res = await request(app).post("/products").send({ name: "X", price: -1, stock: -3 });
    expect(res.status).toBe(400);
  });

  it("GET /no-existe => 404 (ruta inexistente)", async () => {
  const res = await request(app).get("/no-existe");
  expect(res.status).toBe(404);
});

it("GET /boom => 500 (error interno JSON)", async () => {
  const res = await request(app).get("/boom");
  expect(res.status).toBe(500);
  expect(res.body).toBeDefined();
  expect(res.body.error).toBe("internal_error");
  expect(typeof res.body.message).toBe("string");
});

});
