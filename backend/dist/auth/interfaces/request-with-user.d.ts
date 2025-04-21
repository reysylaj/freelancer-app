import { Request } from 'express';
import { AuthUser } from './auth-user';
export interface RequestWithUser extends Omit<Request, 'user'> {
    user: AuthUser;
}
