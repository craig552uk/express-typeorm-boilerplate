import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";

let app: SuperTest<Test>;

describe("GET /products", () => {

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    it("should return all products", () => {
        app.get("/products")
            .expect(200);
    });
});
