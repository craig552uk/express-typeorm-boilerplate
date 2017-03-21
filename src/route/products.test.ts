import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { createConnectedApp } from "../lib/app";
import * as supertest from "supertest";
import "mocha";

let options: ConnectionOptions = {
    driver: {
        type: "sqlite",
        storage: ":memory:"
    },
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: true
};

let testApp: supertest.SuperTest<supertest.Test>;

describe("GET /products", () => {

    before(done => {
        createConnectedApp(options).then(app => {
            testApp = supertest(app);
            done();
        });
    });

    it("should return all products", () => {

        testApp.get("/products")
            .expect(200);

    });
});


