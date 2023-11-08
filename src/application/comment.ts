import { Comment } from '../domain/comment';
import { generateUUID } from '../domain/uuid';
import * as commentDB from "../infra/comment";

export const getAllComment = async () => {
    try {
        const comment = await commentDB.getAllComment();
        return comment;
    } catch (error) {
        console.error("Error in getting all comment:", error);
        throw new Error(`Error in getting all comment: ${error}`);
    }
}