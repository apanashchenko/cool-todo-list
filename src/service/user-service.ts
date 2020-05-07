import * as userRepository from "../repository/user-repository";
import {User} from "../model/user";
import bCrypt from "bcrypt";

export const saveUser = async (user: User) => {
    const saltRounds = 10;
    user.password = await bCrypt.hash(user.password, saltRounds);
    return await userRepository.save(user);
};

export const findUserById = async (id: number) => {
    return await userRepository.findById(id);
};

export const findByEmail = async (email: string) => {
    return await userRepository.findByEmail(email);
};

export const updateUser = async (id: number, todo: User) => {
    return await userRepository.update(id, todo);
};

export const deleteUser = async (id: number) => {
    return await userRepository.deleteUser(id);
};
