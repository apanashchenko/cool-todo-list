import request from "supertest";
import {createConnection} from "typeorm";
import {Connection} from "typeorm/connection/Connection";
import {app} from "../src/app";
import * as projectService from '../src/service/project-service'
import {Project} from "../src/model/project";
import {Todo} from "../src/model/todo";

let conn: Connection;

beforeAll(async () => {
    conn = await createConnection({
        type: "sqlite",
        database: "./__tests__/db/todos.sqlite",
        entities: [Project, Todo],
        dropSchema: true,
        synchronize: true
    });
});

afterAll(async () => {
    await conn.dropDatabase();
});

let testProject: Project;

describe('/projects controller tests', () => {

    beforeEach(async () => {
        let data: Project = new Project();
        data.name = "test-project";
        testProject = await projectService.saveProject(data);
    })

    afterEach(async () => {
        await conn.getRepository(Project).clear();
    })

    test("POST /projects", async () => {
        const project = {
            "name": "trololo-project"
        }

        const projectResponse = await request(app).post('/projects').send(project);
        expect(projectResponse.status).toEqual(200);
        expect(projectResponse.body.name).toEqual(project.name);
        expect(projectResponse.body.id).not.toBe(0);
        expect(projectResponse.body.id).not.toBeNaN();
    });

    test("GET /projects", async () => {
        const res = await request(app).get("/projects");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([testProject]);
    });

    test("GET /projects/:id", async () => {
        const res = await request(app).get("/projects/" + testProject.id);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(testProject.id);
        expect(res.body.name).toEqual(testProject.name);
    });

    test("GET /projects/:id not found", async () => {
        const projectId = 123;
        const res = await request(app).get("/projects/" + projectId);
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: `Project with id ${projectId} not found.`} );
    });

    test("PUT /projects/:id", async () => {
        const project = {
            "name": "updated-project"
        }
        const res = await request(app).put("/projects/" + testProject.id).send(project);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: "updated" });
    });

    test("DELETE /projects/:id", async () => {
        const res = await request(app).delete("/projects/" + testProject.id);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: `Project with id ${testProject.id} removed.`});
    });

});