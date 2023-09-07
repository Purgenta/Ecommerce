import { Module } from '@nestjs/common';
import { ProducerService } from 'src/services/producer.service';
import { PrismaModule } from './prisma.module';
@Module({
  exports: [ProducerService],
  imports: [PrismaModule],
  providers: [ProducerService],
})
export class ProducerModule {}
