import { getManager } from "typeorm";
import {Todo} from "../model/todo";

const todoRepository = () => getManager().getRepository(Todo);

export const save = async (todo: Todo) => {
    return await todoRepository().save(todo);
};

export const findById = async (id: number) => {
    return await todoRepository().findOne(id);
};

export const update = async (id: number, todo: Todo) => {
    return await todoRepository().update(id, todo);
};

export const deleteTodo = async (id: number) => {
    return await todoRepository().delete(id);
};
