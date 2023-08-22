import { HttpException, HttpStatus } from '@nestjs/common';
interface RegisterExceptionInformation {
  email?: string;
  phoneNumber?: string;
}

export class RegisterException extends HttpException {
  constructor(exceptionInformation: RegisterExceptionInformation) {
    super(exceptionInformation, HttpStatus.BAD_REQUEST);
  }
}
