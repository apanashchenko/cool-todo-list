import * as todoRepository from "../repository/todo-repository";
import { Todo } from "../model/todo";

export const saveTodo = async (body: Todo) => {
    return await todoRepository.save(body);
};

export const findTodoById = async (id: number) => {
    return await todoRepository.findById(id);
};

export const findAllProjects = async () => {
    return await todoRepository.findAll();
};
