import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { createTaskDto } from './dto/createtask.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';
import { updateTaskDto } from './dto/updatetask.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() task: createTaskDto) {
    return this.taskService.create(task);
  }

  @Get()
  getAllTaks(@Query() query) {
    return this.taskService.getAllTasks(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteTask(@Param('id') id) {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id, @Body() task: updateTaskDto) {
    return this.taskService.updateTask(id, task);
  }
}
