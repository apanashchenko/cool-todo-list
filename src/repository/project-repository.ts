import { getManager } from "typeorm";
import {Project} from "../model/project";

const projectRepository = () => getManager().getRepository(Project);

export const save = async (project: Project) => {
    return await projectRepository().save(project);
};

export const findById = async (id: number) => {
    return await projectRepository().findOne(id);
};

export const findAll = async () => {
    return await projectRepository().find();
};

export const deleteProject = async (id: number) => {
    return await projectRepository().delete(id);
};

export const updateProject = async (id: number, project: Project) => {
    return await projectRepository().update(id, project);
};

export const findTodos = async (id: number) => {
    return await projectRepository().find({ relations: ["todos"]});
};
