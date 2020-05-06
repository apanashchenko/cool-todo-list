import {RequestHandler} from 'express'
import * as projectService from '../service/project-service'
import {Project} from "../model/project";

export const createProject: RequestHandler = async (req, res, next) => {
    let project = req.body as Project;
    const newProject = await projectService.saveProject(project);
    return res.status(200).json(newProject);
}

export const getProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    const project = await projectService.findProjectById(projectId);
    return res.status(200).json(project);
}

export const getAllProject: RequestHandler = async (req, res, next) => {
    const projects: Project[] = await projectService.findAllProjects();
    return res.status(200).json(projects);
}

export const deleteProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    await projectService.deleteProject(projectId)
    return res.status(200).json({message: `Project with id ${projectId} removed.`});
}

export const updateProject: RequestHandler = async (req, res, next) => {
    const projectId = +req.params.projectId;
    const updateProject = req.body;

    await projectService.updateProject(projectId, updateProject);
    return res.status(200).json({message: 'updated'});
}