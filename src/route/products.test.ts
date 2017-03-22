import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";

describe("GET /products", () => {
    let app: SuperTest<Test>;

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    it("should return all products", () => {
        app.get("/products")
            .expect(200);
    });
});
