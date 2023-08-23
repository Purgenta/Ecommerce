import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/data/auth/login.dto';
import { RegisterDto } from 'src/data/auth/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from './prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {
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
    if (user) {
      const sameEmail = registerDto.email === user.email;
      throw new Error(
        sameEmail
          ? 'Email adress already exists'
          : 'Phone number already exists',
      );
    }
    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    await this.prismaService.user.create({
      data: { ...registerDto, password: passwordHash, role: 'USER' },
    });
    return registerDto;
  }
  async login(loginParams: LoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: loginParams.email },
    });
    if (!user) throw new Error('Invalid login credentials');
    const samePassword = await bcrypt.compare(
      loginParams.password,
      user.password,
    );
    if (!samePassword) throw new Error(`Invalid login credentials`);
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3 days',
    });
    return {
      refreshToken,
      token,
      role: user.role,
    };
  }
  async refreshToken(token: string) {
    return token;
  }
}
