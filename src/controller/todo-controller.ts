import {RequestHandler} from 'express'
import {Todo} from '../model/todo'
import * as projectService from "../service/project-service";
import * as todoService from "../service/todo-service";


export const getAllProjectTodos: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    const project = await projectService.findProjectById(projectId);
    return res.status(200).json(project?.todos)
}

export const createTodo: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    let project = await projectService.findProjectById(projectId);

    let todo = req.body as Todo;
    const newTodo = await todoService.saveTodo(todo);
    project!.todos = [todo].concat(project!.todos);
    await projectService.saveProject(project!);
    return res.status(200).json({newTodo});
}

export const getTodoById: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.todoId;
    const todo = await todoService.findTodoById(todoId);
    return res.json(todo).status(200);
}

export const updateTodo: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.todoId;
    const updatedTodo = req.body as Todo;
    await todoService.updateTodo(todoId, updatedTodo);
    return res.json({message: 'updated'}).status(200);
}

export const deleteTodo: RequestHandler = async (req, res, next) => {
    const todoId = +req.params.todoId;

    await todoService.deleteTodo(todoId);
    return res.status(200).json({message: `Todo with id ${todoId} removed.`});
}