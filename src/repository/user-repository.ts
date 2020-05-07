import { getManager } from "typeorm";
import {User} from "../model/user";

const userRepository = () => getManager().getRepository(User);

export const save = async (user: User) => {
    return await userRepository().save(user);
};

export const findById = async (id: number) => {
    return await userRepository().findOne(id);
};

export const findByEmail = async (email: string) => {
    return await userRepository().findOne({ where: { email: email} });
};

export const update = async (id: number, user: User) => {
    return await userRepository().update(id, user);
};

export const deleteUser = async (id: number) => {
    return await userRepository().delete(id);
};
