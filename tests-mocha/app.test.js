const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../src/app");

describe("API (Mocha+Chai)", () => {
  it("GET /users => 200 y lista", async () => {
    const res = await request(app).get("/users");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an("array");
  });

  it("POST /login inválido => 400", async () => {
    const res = await request(app).post("/login").send({ email: "bad", password: "123" });
    expect(res.status).to.equal(400);
  });

  it("POST /login credenciales inválidas => 401", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "wrong" });
    expect(res.status).to.equal(401);
  });

  it("POST /login válido => 200", async () => {
    const res = await request(app).post("/login").send({ email: "alice@example.com", password: "secret123" });
    expect(res.status).to.equal(200);
    expect(res.body.ok).to.equal(true);
  });

  it("POST /products válido => 201", async () => {
    const res = await request(app).post("/products").send({ name: "Headset", price: 500, stock: 10 });
    expect(res.status).to.equal(201);
    expect(res.body.data.id).to.exist;
  });

  it("POST /products inválido => 400", async () => {
    const res = await request(app).post("/products").send({ name: "H", price: -2, stock: 0 });
    expect(res.status).to.equal(400);
  });

  it("GET /no-existe => 404 (ruta inexistente)", async () => {
  const res = await request(app).get("/no-existe");
  expect(res.status).to.equal(404);
});

it("GET /boom => 500 (error interno JSON)", async () => {
  const res = await request(app).get("/boom");
  expect(res.status).to.equal(500);
  expect(res.body).to.be.an("object");
  expect(res.body.error).to.equal("internal_error");
  expect(res.body.message).to.be.a("string");
});

});
