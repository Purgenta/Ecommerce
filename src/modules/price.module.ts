import { Module } from '@nestjs/common';
import { PriceController } from 'src/controllers/price.controller';
import { PrismaModule } from './prisma.module';
import { ArticleModule } from './article.module';
import { PriceService } from 'src/services/price.service';
@Module({
  controllers: [PriceController],
  imports: [PrismaModule, ArticleModule],
  exports: [PriceService],
  providers: [PriceService],
})
export class PriceModule {}
