export declare class RegisterDto {
    name: string;
    surname: string;
    role: 'client' | 'talent';
    email: string;
    password: string;
    category: string;
    jobRole: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
