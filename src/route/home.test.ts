import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";

let app: SuperTest<Test>;

describe("Basic API routes", () => {

    before(done => {
        getTestApp().then(a => { app = a; done(); });
    });

    describe("GET /", () => {

        it("should return a friendly JSON message", done => {
            app.get("/")
                .expect(200)
                .end((err, res) => err ? done(err) : done());
        });
    });

    describe("GET /teapot", () => {

        it("should return 418 `I'm A Teapot`", done => {
            app.get("/teapot")
                .expect(418)
                .end((err, res) => err ? done(err) : done());
        });
    });

    describe("GET /error", () => {

        it("should return 500 `Internal Server Error`", done => {
            app.get("/error")
                .expect(500)
                .end((err, res) => err ? done(err) : done());
        });
    });
});