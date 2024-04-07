import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ default: 'miembro' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Task, (task) => task.users)
  tasks: Task[];

  @Column()
  password: string;
  @Column({ select: false })
  sal: string;

  @BeforeInsert()
  async beforeInsertSal() {
    this.sal = await bcrypt.genSalt();
  }

  // antes de guardar hasheamos el password
  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
