import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
