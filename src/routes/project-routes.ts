import { Router } from 'express';
import todoRoutes from '../routes/todo-routes'
import { getAllProject, getProject, createProject, updateProject, deleteProject } from '../controller/project-controller'

const router = Router();

router.get('/', getAllProject);

router.get('/:id', getProject);

router.post('/', createProject);

router.put('/:id', updateProject);

router.delete('/:id', deleteProject);

router.use('/:projectId/todos', todoRoutes);

export default router;