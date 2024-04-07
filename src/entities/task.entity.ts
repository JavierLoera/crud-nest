import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  hours_to_complete: number;

  @CreateDateColumn()
  expiration_date: Date;

  @Column()
  status: number;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable()
  users: User[];

  @Column({ default: 0 })
  cost: number;

  @CreateDateColumn()
  createdAt: Date;
}
