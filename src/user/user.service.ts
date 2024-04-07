import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createuser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDTO): Promise<Partial<User> | Error> {
    const userDb = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userDb) {
      return new BadRequestException('Ya existe un usuario con ese email');
    }
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    const { sal, password, ...result } = newUser;
    return result;
  }

  async getUsersByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  async getUsers(name, rol, email): Promise<User[]> {
    let query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.tasks', 'task')
      .select([
        'user',
        'SUM(CASE WHEN task.status = 2 THEN task.cost ELSE 0 END) AS total_tasks',
        'SUM(CASE WHEN task.status = 2 THEN 1 ELSE 0 END) AS completed_tasks',
      ])
      .groupBy('user.id');

    if (name) {
      query.andWhere('user.name like  :name', { name: `%${name}%` });
    }
    if (rol) {
      query.andWhere('lower(user.role) = lower(:rol)', { rol });
    }
    if (email) {
      query.andWhere('user.email = :email', { email });
    }

    return query.getRawMany();
  }
}
