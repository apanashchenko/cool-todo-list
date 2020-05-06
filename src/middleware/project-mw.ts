import {Request, Response} from "express";
import * as projectService from "../service/project-service";

export async function projectNotFoundMiddleware(req: Request, res: Response, next: any) {
    let projectId = +req.params.id;
    if (isNaN(projectId)) {
        projectId = +req.params.projectId;
    }
    console.log('projectId', projectId)
    const project = await projectService.findProjectById(projectId);
    if (!project) return res.status(404).json({message: `Project with id ${projectId} not found.`});
    next();
}