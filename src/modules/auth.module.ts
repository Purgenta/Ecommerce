import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.controller';
import { PrismaModule } from './prisma.module';
import { CartModule } from './cart.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15min' },
    }),
    PrismaModule,
    CartModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
