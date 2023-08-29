import { ProducerDto } from 'src/data/producer/producer.dto';
import { PrismaService } from './prisma.service';
import { UniqueProducerException } from 'src/exceptions/producer/uniqueProducerException';

export class ProducerService {
  constructor(private prismaService: PrismaService) {}
  async findById(id: number) {
    return this.prismaService.producer.findFirstOrThrow({ where: { id } });
  }
  async create(producer: ProducerDto) {
    if (await this.findByName(producer.name))
      throw new UniqueProducerException(producer.name);
  }
  async findByName(name: string) {
    return this.prismaService.producer.findFirst({ where: { name } });
  }
}
