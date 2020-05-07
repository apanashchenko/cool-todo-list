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

beforeEach(async () => {
    const password = '123456';
    testUser = new User();
    testUser.email = 'it_test@mail.com';
    testUser.password = password;
    testUser = await userService.saveUser(testUser);
})

afterEach(async () => {
    await conn.getRepository(Project).clear();
    await conn.getRepository(User).clear();
})

afterAll(async () => {
    await conn.dropDatabase();
});


let testUser: User;

describe('/users controller tests', () => {

    test("POST /registration", async () => {
        const user = {
            email: 'test-uses@mai.com',
            password: '123456'
        }

        const projectResponse = await request(app)
            .post('/registration')
            .send(user);
        expect(projectResponse.status).toEqual(200);
        expect(projectResponse.body.email).toEqual(user.email);
        expect(projectResponse.body.id).not.toBe(0);
        expect(projectResponse.body.id).not.toBeNaN();
    });

    test("POST /registration user already exist", async () => {
        const user = {
            email: testUser.email,
            password: '123456'
        }

        const projectResponse = await request(app)
            .post('/registration')
            .send(user);
        expect(projectResponse.status).toEqual(400);
        expect(projectResponse.body).toEqual({message: `User with email ${user.email} already exist.`});
    });
});

describe('/login controller tests', () => {

    test("POST /login", async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: '123456' });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body.token).not.toBeUndefined();
        expect(loginResponse.body.token).not.toBeNaN();
    });

    test("POST /login invalid email", async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({ email: 'testUser@email.com', password: '123456' });
        expect(loginResponse.status).toEqual(401);
        expect(loginResponse.body).toEqual({message: "Invalid email or password!"})
    });

    test("POST /login invalid password", async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: '00000' });
        expect(loginResponse.status).toEqual(401);
        expect(loginResponse.body).toEqual({message: "Invalid email or password!"})
    });


    test("GET /projects/:id", async () => {
        let project: Project = new Project();
        project.name = "test-project";
        project = await projectService.saveProject(project);

        const loginResponse = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: '123456' });

        const res = await request(app)
            .get("/projects/" + project.id)
            .set('Authorization', 'Bearer ' + loginResponse.body.token);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(project.id);
        expect(res.body.name).toEqual(project.name);
    });



});