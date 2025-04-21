// A simple type that describes the decoded user from JWT
export type AuthUser = {
    id: number;
    email?: string;
    role?: string;
};
