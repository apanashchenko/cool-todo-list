import * as projectRepository from "../repository/project-repository";
import { Project } from "../model/project";

export const saveProject = async (project: Project) => {
    return await projectRepository.save(project);
};

export const findProjectById = async (id: number)=> {
    return await projectRepository.findById(id);
};

export const findAllProjects = async () => {
    return await projectRepository.findAll();
};

export const deleteProject = async (id: number) => {
    return await projectRepository.deleteProject(id);
};

export const updateProject = async (id: number, project: Project) => {
    return await projectRepository.updateProject(id, project);
};
