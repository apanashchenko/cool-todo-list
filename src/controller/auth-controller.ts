import {RequestHandler} from "express";
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../service/user-service";
import {User} from "../model/user";
import {jwtToken} from "../config/config";

export const signIn: RequestHandler = async (req, res, next) => {
    let body = req.body as User;
    const user = await userService.findByEmail(body.email);
    if (!user) {
        return res.status(401).json({message: "Invalid email or password!"});
    }

    const isValid = bCrypt.compareSync(body.password, user.password);
    if (isValid) {
        const token = jwt.sign({ id: user.id, email: user.email }, jwtToken.secret, { expiresIn: jwtToken.expiresIn });
        return res.status(200).json({token: token});
    }

    return res.status(401).json({message: "Invalid email or password!"});
}