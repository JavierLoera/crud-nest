import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from '../providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
