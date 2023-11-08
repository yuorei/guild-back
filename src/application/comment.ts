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

export const createComment = async (commentInput: Comment) => {
    commentInput.id = generateUUID();

    try {
        await commentDB.createComment(commentInput);
    } catch (error) {
        console.error("Error in creating comment:", error);
        throw new Error(`Error in creating comment: ${error}`);
    }
}

export const updateComment = async (commentId: string, commentInput: Comment) => {
    try {
        await commentDB.updateComment(commentId, commentInput);
    } catch (error) {
        console.error("Error in updating comment:", error);
        throw new Error(`Error in updating comment: ${error}`);
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        await commentDB.deleteComment(commentId);
    } catch (error) {
        console.error("Error in deleting comment:", error);
        throw new Error(`Error in deleting comment: ${error}`);
    }
}

export const getCommentById = async (commentId: string) => {
    try {
        const comment = await commentDB.getCommentById(commentId);
        return comment;
    } catch (error) {
        console.error("Error in getting comment by id:", error);
        throw new Error(`Error in getting comment by id: ${error}`);
    }
}

export const getCommentByUserId = async (userId: string) => {
    try {
        const comment = await commentDB.getCommentByUserId(userId);
        return comment;
    } catch (error) {
        console.error("Error in getting comment by user id:", error);
        throw new Error(`Error in getting comment by user id: ${error}`);
    }
}

export const getCommentByPostId = async (postId: string) => {
    try {
        const comment = await commentDB.getCommentByPostId(postId);
        return comment;
    } catch (error) {
        console.error("Error in getting comment by post id:", error);
        throw new Error(`Error in getting comment by post id: ${error}`);
    }
}
