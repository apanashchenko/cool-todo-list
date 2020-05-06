import { getManager } from "typeorm";
import {Todo} from "../model/todo";
import {Project} from "../model/project";

const todoRepository = () => getManager().getRepository(Todo);

export const save = async (todo: Todo) => {
    return await todoRepository().save(todo);
};

export const findById = async (id: number) => {
    return await todoRepository().findOne(id);
};

export const findAll = async () => {
    return await todoRepository().find();
};

export const findTodoById2 = async (project: Project) => {
    return await todoRepository().find({ relations: ["project"] });
};
