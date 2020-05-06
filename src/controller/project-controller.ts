import {RequestHandler} from 'express'
import * as projectService from '../service/project-service'
import {Project} from "../model/project";

export const createProject: RequestHandler = async (req, res, next) => {
    let project = req.body as Project;
    const newProject = await projectService.saveProject(project);
    return res.status(200).json(newProject);
}

export const getProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.id;
    console.log('req.params', req.params)

    const project = await projectService.findProjectById(projectId);
    if (project) {
        console.log(project);
        return res.status(200).json(project);
    }

    return res.status(404).json({message: `Project with id ${projectId} not found.`});
}

export const getAllProject: RequestHandler = async (req, res, next) => {
    const projects: Project[] = await projectService.findAllProjects();
    return res.status(200).json(projects);
}

export const deleteProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.id;
    const project = await projectService.findProjectById(projectId);

    if (project) {
        await projectService.deleteProject(projectId)
        return res.status(200).json({message: `Project with id ${projectId} removed.`});
    }

    return res.status(404).json({message: `Project with id ${projectId} not found.`});
}

export const updateProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.id;
    const updateProject = req.body;

    const project = await projectService.findProjectById(projectId);

    if (project) {
        await projectService.updateProject(projectId, updateProject);
        return res.status(200).json({message: 'updated'});
    }

    return res.status(404).json({message: `Project with id ${projectId} not found.`});
}