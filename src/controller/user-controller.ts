import {RequestHandler} from "express";
import * as userService from "../service/user-service";
import {User} from "../model/user";

export const registerUser: RequestHandler = async (req, res, next) => {
    let email = req.body.email;
    const isUserExist = await userService.findByEmail(email);
    if (isUserExist) {
        return res.status(400).json({message: `User with email ${email} already exist.`});
    }

    let user = new User();
    user.email = email;
    user.password = req.body.password;
    const newUser = await userService.saveUser(user);
    return res.status(200).json({id: newUser.id, email: newUser.email});
}