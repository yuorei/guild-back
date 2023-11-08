import prisma from '../lib/client';
import { Comment } from '../domain/comment';

export const getAllComment = async () => {
    try {
        const comments = await prisma.comment.findMany();
        return comments as Comment[];
    }
    catch (error) {
        console.error("Error in getting all comments:", error);
        throw new Error(`Error in getting all comments: ${error}`);
    }
}
