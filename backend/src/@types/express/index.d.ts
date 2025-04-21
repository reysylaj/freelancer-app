// backend/src/@types/express/index.d.ts
import { User } from '../../users/user.entity'; // adjust the path if needed

declare global {
    namespace Express {
        interface Request {
            user?: User & { id: number }; // extend with your user structure
        }
    }
}
