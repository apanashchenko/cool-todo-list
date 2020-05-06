import {RequestHandler} from 'express'
import {Todo} from '../model/todo'
import * as projectService from "../service/project-service";
import * as todoService from "../service/todo-service";


export const getAllProjectTodos: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    const project = await projectService.findProjectById(projectId);
    if (project) {
        return res.status(200).json(project?.todos)
    }

    return res.status(404).json({message: `Project with id ${projectId} not found.`});
}

export const createTodo: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    const project = await projectService.findProjectById(projectId);

    if (project) {
        let todo = req.body as Todo;
        const newTodo = await todoService.saveTodo(todo);
        project.todos = [todo].concat(project.todos);
        await projectService.saveProject(project);
        return res.status(200).json({newTodo});
    }

    return res.status(404).json({message: `Project with id ${projectId} not found.`});
}

export const getTodoById: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.id;
    const todo = await todoService.findTodoById(todoId);
    if (todo) {
        return res.json(todo).status(200);
    }
    return res.status(404).json({message: `Todo with id ${todoId} not found.`});
}

export const updateTodo: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.id;

    const currentTodo = await todoService.findTodoById(todoId);

    if (currentTodo) {
        const updatedTodo = req.body as Todo;
        await todoService.updateTodo(todoId, updatedTodo);
        return res.json({message: 'updated'}).status(200);
    }

    return res.status(404).json({message: `Todo with id ${todoId} not found.`});
}

export const deleteTodo: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.id;

    const currentTodo = await todoService.findTodoById(todoId);
    if (currentTodo) {
        await todoService.deleteTodo(todoId);
        return res.status(201).json({message: `Todo with id ${todoId} removed.`});
    }

    return res.status(404).json({message: `Todo with id ${todoId} not found.`});
}