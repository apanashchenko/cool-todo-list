import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Todo } from "./todo";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Todo, todo => todo.project)
    todos: Todo[];

}