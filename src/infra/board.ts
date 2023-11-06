import prisma from '../lib/client';
import { Board } from '../domain/board';

export const getAllBoard = async () => {
    try {
        const boards = await prisma.board.findMany();
        return boards as Board[];
    }
    catch (error) {
        console.error("Error in getting all boards:", error);
        throw new Error(`Error in getting all boards: ${error}`);
    }
}

export const getBoardById = async (boardId: string) => {
    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
        });
        return board as Board;
    } catch (error) {
        console.error("Error in getting board by id:", error);
        throw new Error(`Error in getting board by id: ${error}`);
    }
};

export const getBoardByUserId = async (userId: string) => {
    try {
        const boards = await prisma.board.findMany({
            where: {
                user_id: userId,
            },
        });
        return boards as Board[];
    } catch (error) {
        console.error("Error in getting board by user id:", error);
        throw new Error(`Error in getting board by user id: ${error}`);
    }
}

export const createBoard = async (boardInput: Board) => {
    try {
        await prisma.board.create({
            data: {
                ...boardInput,
            },
        });
        return true;
    } catch (error) {
        console.error("Error in creating board:", error);
        throw new Error(`Error in creating board: ${error}`);
    }
};

export const updateBoard = async (boardInput: Board) => {
    try {
        await prisma.board.update({
            where: {
                id: boardInput.id,
                user_id: boardInput.user_id,
            },
            data: {
                ...boardInput,
            },
        });
        return true;
    } catch (error) {
        console.error("Error in updating board:", error);
        throw new Error(`Error in updating board: ${error}`);
    }
};

export const deleteBoard = async (boardId: string, userId: string) => {
    try {
        await prisma.board.delete({
            where: {
                id: boardId,
                user_id: userId,
            },
        });
        return true;
    } catch (error) {
        console.error("Error in deleting board:", error);
        throw new Error(`Error in deleting board: ${error}`);
    }
};
