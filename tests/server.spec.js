const request = require("supertest");
const server = require("../index");

describe("CRUD operations for cafes", () => {
    describe("GET /cafes", () => {
        it("Should return a 200 status", async () => {
            const response = await request(server).get("/cafes").send();
            const status = response.statusCode;
            expect(status).toBe(200);
        });
        it("Should return an array with at least one object", async () => {
            const { body } = await request(server).get("/cafes").send();
            const cafe = body;
            expect(cafe).toBeInstanceOf(Array);
            expect(cafe.length).toBeGreaterThan(0);
        });
    });
    
    describe("DELETE /cafes/:id", () => {
        it("Should return a 404 status when trying to delete a non-existent cafe", async () => {
            const jwt = "token";
            const idDeProductoAEliminar = 1000;
            const response = await request(server)
              .delete(`/cafes/${idDeProductoAEliminar}`)
              .set("Authorization", jwt)
              .send();
            const status = response.statusCode;
            expect(status).toBe(404);
        });
    });
    
    describe("POST /cafes", () => {
        it("Should return a 201 status and the new cafe object when adding a new cafe", async () => {
            const id = Math.floor(Math.random() * 999);
            const cafe = { id, nombre: "Nuevo cafe" };
            const response = await request(server).post("/cafes").send(cafe);
            const cafes = response.body;
            const status = response.statusCode;
            expect(cafes).toContainEqual(cafe);
            expect(status).toBe(201);
        });
    });

    describe("PUT /cafes/:id", () => {
        it("Should return a 400 status when trying to update a cafe", async () => {
            const response = await request(server)
                .put("/cafes/2")
                .send({
                    id: 1,
                    nombre: "Producto actualizado",
                });
            expect(response.statusCode).toBe(400);
        });
    });
});