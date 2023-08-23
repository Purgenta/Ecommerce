import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { CartModule } from './modules/cart.module';
@Module({
  imports: [AuthModule, CartModule],
})
export class AppModule {}
