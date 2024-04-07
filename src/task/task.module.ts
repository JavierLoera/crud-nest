import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from 'src/providers/task.providers';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    TaskService,
    ...taskProviders,
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ],
  controllers: [TaskController],
})
export class TaskModule {}
