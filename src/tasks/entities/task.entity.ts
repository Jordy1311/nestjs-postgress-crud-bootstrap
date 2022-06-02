import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Importance } from "./importance.entity";

@Entity() // sql table = 'task' unless string is passed here
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @ManyToOne(
    type => Importance,
    (importance) => importance.tasks
  )
  importance: 'low' | 'medium' | 'high';
}