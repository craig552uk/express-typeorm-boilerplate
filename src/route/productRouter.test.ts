import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";
import { ProductController as Products } from "../controller/ProductController";
import { Product } from "../entity/Product";

describe("Products API", () => {

    let app: SuperTest<Test>;

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });


    describe("GET /products", () => {

        before(done => {
            Promise.all([
                Products.add({ name: "Apples" }),
                Products.add({ name: "Oranges" }),
                Products.add({ name: "Pears" }),
            ]).then(() => done());
        });

        after(done => {
            Products.deleteAll().then(() => done());
        });

        it("should return all Products", done => {
            app.get("/products")
                .expect(res => {
                    if (!res.body.data) throw new Error("Expected data in response");
                    if (res.body.data.length != 3) throw new Error("Expected 3 Products in response");
                })
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });

    describe("POST /products", () => {

        let fields = { name: "Bananas" };

        after(done => {
            Products.deleteAll().then(() => done());
        });

        it("should 400 if `name` not provided", done => {
            app.post(`/products`)
                .send({ name: "" })
                .expect("Content-Type", /json/)
                .expect(400, { error: { message: "Product requires `name`" } }, done);
        });

        it("should create and return a new product", done => {
            app.post("/products")
                .send(fields)
                .expect(res => {
                    if (!res.body.data) throw new Error("Expected data in response");
                    if (!res.body.data.id) throw new Error("Expected Product to have id");
                    if (!res.body.data.name) throw new Error("Expected Product to have name");
                    if (res.body.data.name !== fields.name) throw new Error(`Expected Product name to be '${fields.name}'`);
                })
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });

    describe("GET /products/:id", () => {

        let product: Product;

        before(done => {
            Products.add({ name: "Grapes" }).then(i => { product = i; done() });
        });

        after(done => {
            Products.deleteAll().then(() => done());
        });

        it("should 404 if no Product exists with `id`", done => {
            app.get(`/products/9999`)
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } }, done);
        });

        it("should get product with `id`", done => {
            app.get(`/products/${product.id}`)
                .expect("Content-Type", /json/)
                .expect(200, {
                    data: {
                        id: product.id,
                        name: product.name
                    }
                }, done);
        });
    });

    describe("POST /products/:id", () => {

        let product: Product;
        let fields = { name: "Mangos" };

        before(done => {
            Products.add({ name: "Strawberries" }).then(i => { product = i; done() });
        });

        after(done => {
            Products.deleteAll().then(() => done());
        });

        it("should 404 if no Product exists with `id`", done => {
            app.post("/products/9999")
                .send(fields)
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } }, done);
        });

        it("should 400 if `name` not provided", done => {
            app.post(`/products/${product.id}`)
                .send({ name: "" })
                .expect("Content-Type", /json/)
                .expect(400, { error: { message: "Product requires `name`" } }, done);
        });

        it("should update product with `id`", done => {
            app.post(`/products/${product.id}`)
                .send(fields)
                .expect("Content-Type", /json/)
                .expect(200, {
                    data: {
                        id: product.id,
                        name: fields.name
                    }
                }, done);
        });
    });

    describe("DELETE /products/:id", () => {

        let product: Product;

        before(done => {
            Products.add({ name: "Strawberries" }).then(i => { product = i; done() });
        });

        after(done => {
            Products.deleteAll().then(() => done());
        });

        it("should 404 if no Product exists with `id`", done => {
            app.delete("/products/9999")
                .expect("Content-Type", /json/)
                .expect(404, { error: { message: "Not Found" } }, done);
        });

        it("should delete product with `id`", done => {
            app.delete(`/products/${product.id}`)
                .expect("Content-Type", /json/)
                .expect(200, { data: product.id }, done);
        });
    });
});