import {RequestHandler} from 'express'
import {Todo} from '../model/todo'
import * as projectService from "../service/project-service";
import * as todoService from "../service/todo-service";
import {Project} from "../model/project";


export const getAllProjectTodos: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.id;
    const project = await projectService.findProjectById(projectId);
    console.log('project', project)
    return res.json(project?.todos).status(200);
}

export const createTodo: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    console.log('req.params',req.params);
    console.log('projectId', projectId);
    const project = await projectService.findProjectById(projectId);
    console.log('project', project);
    if (project) {
        let newTodo = req.body as Todo;
        console.log('newTodo', newTodo);
        if (!project.todos) {
            project.todos = [];
            console.log('project.todos;', project.todos);
        }

        await projectService.updateProject(projectId, project)

        return res.json(newTodo).status(200);
    }

    return res.status(404);
}

export const updateTodo: RequestHandler = (req, res, next) => {
}

export const deleteTodo: RequestHandler = (req, res, next) => {
}