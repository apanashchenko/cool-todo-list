import express from 'express'
import bodyParser from "body-parser";
import user from "./routes/user-routes";
import auth from "./routes/auth-routes";
import project from "./routes/project-routes";
import jwt from "jsonwebtoken";
import {jwtToken} from "./config/config";

export const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ status: "UP"});
})

app.use('/', user);
app.use('/', auth);

app.use('/projects', async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) return res.status(401).json({message: `Unauthorized user`});

    const token = authHeader.replace('Bearer ', '');

    try {
        jwt.verify(token, jwtToken.secret)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: `Invalid token`});
        }
    }
    next();
});

app.use('/projects', project);