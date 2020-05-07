import request from "supertest";
import {createConnection} from "typeorm";
import {Connection} from "typeorm/connection/Connection";
import {app} from "../src/app";
import * as projectService from '../src/service/project-service'
import * as userService from '../src/service/user-service'
import {Project} from "../src/model/project";
import {Todo} from "../src/model/todo";
import {User} from "../src/model/user";

let conn: Connection;

beforeAll(async () => {
    conn = await createConnection({
        type: "sqlite",
        database: "./__tests__/db/todos.sqlite",
        entities: [Project, Todo, User],
        dropSchema: true,
        synchronize: true
    });
});

afterAll(async () => {
    await conn.dropDatabase();
});

let testUser: User;
let testProject: Project;
let authToken: string;

describe('/projects controller tests', () => {

    beforeEach(async () => {
        const password = '123456';
        testUser = new User();
        testUser.email = 'it_test@mail.com';
        testUser.password = password;
        testUser = await userService.saveUser(testUser);
        console.log('testUser', testUser);

        const loginResponse = await request(app)
            .post('/login').send({ email: testUser.email, password: password });
        console.log('loginResponse', loginResponse)
        authToken = loginResponse.body.token;
        console.log('authToken', authToken)

        let data: Project = new Project();
        data.name = "test-project";
        testProject = await projectService.saveProject(data);
    })

    afterEach(async () => {
        await conn.getRepository(Project).clear();
        await conn.getRepository(User).clear();
    })

    test("POST /projects", async () => {
        const project = {
            "name": "trololo-project"
        }

        const projectResponse = await request(app)
            .post('/projects')
            .set('Authorization', 'Bearer ' + authToken)
            .send(project);
        expect(projectResponse.status).toEqual(200);
        expect(projectResponse.body.name).toEqual(project.name);
        expect(projectResponse.body.id).not.toBe(0);
        expect(projectResponse.body.id).not.toBeNaN();
    });

    test("GET /projects", async () => {
        const res = await request(app)
            .get("/projects")
            .set('Authorization', 'Bearer ' + authToken);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([testProject]);
    });

    test("GET /projects/:id", async () => {
        const res = await request(app)
            .get("/projects/" + testProject.id)
            .set('Authorization', 'Bearer ' + authToken);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(testProject.id);
        expect(res.body.name).toEqual(testProject.name);
    });

    test("GET /projects/:id not found", async () => {
        const projectId = 123;
        const res = await request(app)
            .get("/projects/" + projectId)
            .set('Authorization', 'Bearer ' + authToken);
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: `Project with id ${projectId} not found.`} );
    });

    test("PUT /projects/:id", async () => {
        const project = {
            "name": "updated-project"
        }
        const res = await request(app)
            .put("/projects/" + testProject.id)
            .set('Authorization', 'Bearer ' + authToken)
            .send(project);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: "updated" });
    });

    test("DELETE /projects/:id", async () => {
        const res = await request(app)
            .delete("/projects/" + testProject.id)
            .set('Authorization', 'Bearer ' + authToken);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: `Project with id ${testProject.id} removed.`});
    });

});