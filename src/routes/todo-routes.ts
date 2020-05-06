import { Router } from 'express';
import { getAllProjectTodos, createTodo, getTodoById, updateTodo, deleteTodo } from '../controller/todo-controller'

const router = Router({ mergeParams: true});

router.get('/', getAllProjectTodos);

router.post('/', createTodo);

router.get('/:id', getTodoById);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;