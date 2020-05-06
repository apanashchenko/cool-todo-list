import { Router } from 'express';
import { createTodo, getAllProjectTodos } from '../controller/todo-controller'

const router = Router({ mergeParams: true});

router.get('/', getAllProjectTodos);

router.post('/', createTodo);

router.patch('/:id', );

router.delete('/:id');

export default router;