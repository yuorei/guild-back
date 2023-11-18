export interface Board {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    reward: string;
    endDate: Date;
    level: string;
    max: number;
    finished: boolean
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date;
}
