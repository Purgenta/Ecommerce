import { User } from '@prisma/client';
declare global {
  namespace Express {
    export interface Request {
      language?: Language;
      user?: User;
    }
  }
}
