//auth/interfaces/request-with-user.ts

import { Request } from 'express';
import { AuthUser } from './auth-user';

// 👇 Extend Express Request and override only the `user` type
export interface RequestWithUser extends Omit<Request, 'user'> {
    user: AuthUser;
}
