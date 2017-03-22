import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";

let app: SuperTest<Test>;

describe("GET /", () => {

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    it("should return a friendly JSON message", done => {
        app.get("/")
            .expect(200)
            .end((err, res) => err ? done(err) : done());
    });
});

describe("GET /teapot", () => {

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    it("should return 418 `I'm A Teapot`", done => {
        app.get("/teapot")
            .expect(418)
            .end((err, res) => err ? done(err) : done());
    });
});

describe("GET /error", () => {

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    it("should return 500 `Internal Server Error`", done => {
        app.get("/error")
            .expect(500)
            .end((err, res) => err ? done(err) : done());
    });
});
