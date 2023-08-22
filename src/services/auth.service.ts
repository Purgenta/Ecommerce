import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/data/auth/login.dto';
import { RegisterDto } from 'src/data/auth/register.dto';
import { PrismaService } from './prisma.service';
import { RegisterException } from 'src/exceptions/registerRequest.exception';
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async register(registerDto: RegisterDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: { equals: registerDto.email } },
          { phoneNumber: { equals: registerDto.phoneNumber } },
        ],
      },
    });
    if (user)
      throw new RegisterException({
        email:
          registerDto.email === user.email
            ? 'A user with the same email adress already exists'
            : '',
        phoneNumber:
          registerDto.phoneNumber === user.phoneNumber
            ? 'A user with the same phone number already exists'
            : '',
      });
    await this.prismaService.user.create({ data: registerDto });
    return registerDto;
  }
  login(loginParams: LoginDto) {
    return loginParams;
  }
}
