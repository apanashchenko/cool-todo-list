import * as todoRepository from "../repository/todo-repository";
import { Todo } from "../model/todo";

export const saveTodo = async (todo: Todo) => {
    return await todoRepository.save(todo);
};

export const findTodoById = async (id: number) => {
    return await todoRepository.findById(id);
};

export const updateTodo = async (id: number, todo: Todo) => {
    return await todoRepository.update(id, todo);
};

export const deleteTodo = async (id: number) => {
    return await todoRepository.deleteTodo(id);
};
