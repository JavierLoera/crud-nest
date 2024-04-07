import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createuser.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(@Query() query) {
    return this.userService.getUsers(query.name, query.rol, query.email);
  }
}
