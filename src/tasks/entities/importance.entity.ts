import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "./task.entity";

export class Importance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;

  @ManyToOne(
    type => Task,
    task => task.importance
  )
  tasks: Task[];
}
