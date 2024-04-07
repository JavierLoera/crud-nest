import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'datetime' })
  expiration_date: Date;

  @Column()
  status: number;

  @ManyToMany(() => User)
  @Column()
  users: User[];

  @Column({ default: 0 })
  cost: number;

  @Column({ type: 'datetime' })
  createdAt: Date;
}
