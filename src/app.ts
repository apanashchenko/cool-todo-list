import express from 'express'
import bodyParser from "body-parser";
import project from "./routes/project-routes";

export const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ status: "UP"});
})

app.use('/projects', project);