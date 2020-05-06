import { Router} from 'express';
import todoRoutes from '../routes/todo-routes'
import { getAllProject, getProject, createProject, updateProject, deleteProject } from '../controller/project-controller'
import * as projectService from "../service/project-service";

const router = Router();

router.get('/', getAllProject);

router.post('/', createProject);

router.use(async (req, res, next) => {
    const projectId = +req.params.projectId;
    console.log('projectId', projectId)
    const project = await projectService.findProjectById(projectId);
    if (!project) return res.status(404).json({message: `Project with id ${projectId} not found.`});
    next();
});

router.get('/:projectId', getProject);

router.put('/:projectId', updateProject);

router.delete('/:projectId', deleteProject);

router.use('/:projectId/todos', todoRoutes);

export default router;