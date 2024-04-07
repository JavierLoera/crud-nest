import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { createTaskDto } from './dto/createtask.dto';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { updateTaskDto } from './dto/updatetask.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async create(task: createTaskDto): Promise<Task> {
    let users = [];
    if (task.users != null && task.users.length > 0) {
      users = await this.userService.getUsersByIds(task.users);
    }

    const taskWithUsers = {
      ...task,
      users,
    };

    const taskCreated = this.taskRepository.create(taskWithUsers);
    await this.taskRepository.save(taskCreated);

    return taskCreated;
  }

  async getAllTasks(queryParams): Promise<Task[]> {
    let query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.users', 'user')
      .orderBy('task.createdAt', 'DESC');

    if (queryParams.fecha_vencimiento) {
      query.andWhere('date(task.expiration_date) = date(:expiration_date)', {
        expiration_date: queryParams.fecha_vencimiento,
      });
    }
    if (queryParams.name) {
      query.andWhere('trim(task.title) like trim(:name)', {
        name: `%${queryParams.name}%`,
      });
    }
    if (queryParams.user_name) {
      query.andWhere('user.name like  :user_name', {
        user_name: `%${queryParams.user_name}%`,
      });
    }
    if (queryParams.email) {
      query.andWhere('user.email = :email', {
        email: queryParams.email,
      });
    }

    const res = await query.getMany();

    if (res.length > 0) {
      return res;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No se encontraron tareas',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteTask(id: number): Promise<HttpException> {
    const deleted = await this.taskRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      'Tarea eliminada exitosamente',
      HttpStatus.NO_CONTENT,
    );
  }

  async updateTask(id: number, task: updateTaskDto): Promise<Task> {
    let { users: usersIds, ...taskProperties } = task;

    if (Object.keys(taskProperties).length === 0 && usersIds.length === 0) {
      throw new HttpException(
        'No se recibieron datos para actualizar',
        HttpStatus.BAD_REQUEST,
      );
    }

    // buscamos y actualizamos los usuarios cuando existan en el request
    if (usersIds != null && usersIds.length > 0) {
      let users: Array<User> = [];
      users = await this.userService.getUsersByIds(usersIds);

      const actualRelationships = await this.taskRepository
        .createQueryBuilder()
        .relation(Task, 'users')
        .of(id)
        .loadMany();

      await this.taskRepository
        .createQueryBuilder()
        .relation(Task, 'users')
        .of(id)
        .addAndRemove(users, actualRelationships);
    }

    if (Object.keys(taskProperties).length > 0) {
      const taskUpdated = await this.taskRepository.update(
        { id },
        taskProperties,
      );

      if (taskUpdated.affected === 0) {
        throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
    }

    return this.taskRepository.findOne({ where: { id }, relations: ['users'] });
  }
}
