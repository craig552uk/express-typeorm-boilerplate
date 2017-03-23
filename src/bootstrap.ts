import "reflect-metadata";
import * as supertest from "supertest";
import { join } from "path";
import { Application, ApplicationOptions } from "./lib/application";
import { SuperTest, Test } from "supertest";

// Application options for test environment
let options: ApplicationOptions = {
    database: {
        driver: {
            type: "sqlite",
            storage: ":memory:"
        },
        entities: [
            join(__dirname, "entity/*.js")
        ],
        autoSchemaSync: true
    },
    logger: {
        name: "Testing",
        level: 99 // Disable logging
    }
};

/**
 * Get an Application instance wrapped in SuperTest
 * for use in unit tests
 */
export function getTestApp(): Promise<SuperTest<Test>> {
    return Application.getApp(options).then(app => supertest(app));
}
