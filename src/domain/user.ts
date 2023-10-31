export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    rank: string;
    total_achievements: number;
    profileImageURL: string;
    createdAt: Date;
    updatedAt: Date;
}