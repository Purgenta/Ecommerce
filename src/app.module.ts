import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { CartModule } from './modules/cart.module';
import { CategoryModule } from './modules/category.module';
import { PriceModule } from './modules/price.module';
@Module({
  imports: [AuthModule, CartModule, CategoryModule, PriceModule],
})
export class AppModule {}
