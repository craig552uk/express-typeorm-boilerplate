import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";

describe("Products API", () => {

    let app: SuperTest<Test>;

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    xdescribe("GET /products", () => {

        it("should create and return a new product", done => {
            app.get("/products")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });

    xdescribe("POST /products", () => {

        it("should create and return a new product", done => {
            app.get("/products")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });

    xdescribe("GET /products/:id", () => {

        it("should 404 if no Product exists with `id`", done => {
            app.get("/products/999")
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } })
                .end((err, res) => err ? done(err) : done());

        });

        it("should get product with `id`", done => {
            app.get("/products")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });

    xdescribe("POST /products/:id", () => {

        it("should 404 if no Product exists with `id`", done => {
            app.get("/products/999")
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } })
                .end((err, res) => err ? done(err) : done());

        });

        it("should update product with `id`", done => {
            app.get("/products")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });

    xdescribe("DELETE /products/:id", () => {

        it("should 404 if no Product exists with `id`", done => {
            app.get("/products/999")
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } })
                .end((err, res) => err ? done(err) : done());

        });

        it("should delete product with `id`", done => {
            app.get("/products")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });
});