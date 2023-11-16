export interface Board {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    reward: string;
    endDate: Date;
    lebel: string;
    max: number;
    finished:boolean
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date;
}
