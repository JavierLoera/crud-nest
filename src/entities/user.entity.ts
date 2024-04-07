import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ default: 'miembro' })
  role: string;

  @Column({ type: 'datetime' })
  createdAt: Date;
}
