import { Module } from '@nestjs/common';
import { CategoryController } from 'src/controllers/category.controller';
import { CategoryService } from 'src/services/category.service';
import { PrismaModule } from './prisma.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';
import { CategoryFeatureService } from 'src/services/categoryFeature.service';

@Module({
  controllers: [CategoryController],
  imports: [PrismaModule],
  exports: [CategoryService, CategoryFeatureService],
  providers: [
    CategoryService,
    CategoryFeatureService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class CategoryModule {}
