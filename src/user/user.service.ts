import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
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
}
