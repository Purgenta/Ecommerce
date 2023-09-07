import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';
import { UserService } from 'src/services/user.service';
@Module({
  controllers: [UserController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    UserService,
  ],
})
export class UserModule {}
