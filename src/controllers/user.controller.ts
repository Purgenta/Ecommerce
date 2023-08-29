import {
  Controller,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/services/user.service';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  async profile() {}
  @Roles('ADMIN')
  @Get('profile/:id')
  async getById(@Param('id') id: number) {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      return new NotFoundException("User with the said id doesn't exist");
    }
  }
}
