import "reflect-metadata";
import * as supertest from "supertest";
import { Application, ApplicationOptions } from "./lib/application";
import { SuperTest, Test } from "supertest";

// Application options for test environment
const options: ApplicationOptions = {
    connectionName: "memory-db",
    logLevel: 99,
};

/**
 * Get an Application instance wrapped in SuperTest
 * for use in unit tests
 */
export function getTestApp(): Promise<SuperTest<Test>> {
    return Application.getApp(options)
        .then(app => supertest(app))
        .catch(e => Application.logger.error(e));

}
