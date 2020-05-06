import { Router } from 'express';
import { getAllProjectTodos, createTodo, getTodoById, updateTodo, deleteTodo } from '../controller/todo-controller'
import * as projectService from "../service/project-service";
import * as todoService from "../service/todo-service";
import {Project} from "../model/project";

const router = Router({ mergeParams: true});

router.get('/', getAllProjectTodos);

router.post('/', createTodo);

router.use('/:todoId', async (req, res, next) => {
    const projectId = +req.params.projectId;
    const todoId = +req.params.todoId;
    const project = await projectService.findProjectById(projectId);
    const todo = await todoService.findTodoByProjectAndTodoId(project!, todoId);
    if (!todo) return res.status(404).json({message: `Todo with id ${todoId} not found.`});
    next();
});

router.get('/:todoId', getTodoById);

router.put('/:todoId', updateTodo);

router.delete('/:todoId', deleteTodo);

export default router;