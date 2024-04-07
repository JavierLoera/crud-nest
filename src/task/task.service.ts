import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { createTaskDto } from './dto/createtask.dto';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

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
}
