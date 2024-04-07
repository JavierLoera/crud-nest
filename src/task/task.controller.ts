import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createTaskDto } from './dto/createtask.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() task: createTaskDto) {
    return this.taskService.create(task);
  }
}
