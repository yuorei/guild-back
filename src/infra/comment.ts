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

export const createComment = async (commentInput: Comment) => {
    try {
        await prisma.comment.create({
            data: {
                id: commentInput.id,
                user_id: commentInput.user_id,
                post_id: commentInput.post_id,
                content: commentInput.content,
            }
        });
    } catch (error) {
        console.error("Error in creating comment:", error);
        throw new Error(`Error in creating comment: ${error}`);
    }
}

export const updateComment = async (commentId: string, commentInput: Comment) => {
    try {
        await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                content: commentInput.content,
            }
        });
    } catch (error) {
        console.error("Error in updating comment:", error);
        throw new Error(`Error in updating comment: ${error}`);
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        });
    } catch (error) {
        console.error("Error in deleting comment:", error);
        throw new Error(`Error in deleting comment: ${error}`);
    }
}

export const getCommentById = async (commentId: string) => {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        });
        return comment as Comment;
    } catch (error) {
        console.error("Error in getting comment by id:", error);
        throw new Error(`Error in getting comment by id: ${error}`);
    }
}

export const getCommentByUserId = async (userId: string) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                user_id: userId
            }
        });
        return comments as Comment[];
    } catch (error) {
        console.error("Error in getting comment by user id:", error);
        throw new Error(`Error in getting comment by user id: ${error}`);
    }
}

export const getCommentByPostId = async (postId: string) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                post_id: postId
            }
        });
        return comments as Comment[];
    } catch (error) {
        console.error("Error in getting comment by post id:", error);
        throw new Error(`Error in getting comment by post id: ${error}`);
    }
}

export const getCommentAndUserByPostId = async (postId: string) => {
    try {
        const commentsWithUsers = await prisma.comment.findMany({
            where: {
                post_id: postId,
            },
            include: {
                commenter: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        // password: true,
                        rank: true,
                        total_achievements: true,
                        profileImageURL: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return commentsWithUsers;
    } catch (error) {
        console.error("Error in getting comment and user by post id:", error);
        throw new Error(`Error in getting comment and user by post id: ${error}`);
    }
}