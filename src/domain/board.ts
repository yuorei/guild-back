export interface Board {
    id: string;
    creator_id: string;
    title: string;
    description: string | null;
    reward: string;
    endDate: Date;
    lebel: string;
    max: number;
    min: number;
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date;
}
