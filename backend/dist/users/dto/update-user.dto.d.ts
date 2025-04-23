export declare class UpdateUserDto {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    role?: 'client' | 'talent';
    category?: string;
    bio?: string;
    skills?: string;
    profilePicture?: string;
    coverImage?: string;
    preferredLink?: string;
    jobsPosted?: number;
}
