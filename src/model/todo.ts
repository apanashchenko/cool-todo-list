import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    isDone: boolean

    @ManyToOne(type => Project, project => project.todos)
    project: Project;

}