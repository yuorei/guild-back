import prisma from '../lib/client';
import { Board } from '../domain/board';
import { generateUUID } from '../domain/uuid';
import { Prisma } from '@prisma/client'

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

export const finishedBoard = async (boardId: string, userId: string) => {
    try {
        await prisma.board.update({
            where: {
                id: boardId,
                user_id: userId,
            },
            data: {
                finished: true,
            },
        });
        return true;
    } catch (error) {
        console.error("Error in finished board:", error);
        throw new Error(`Error in finished board: ${error}`);
    }
}

export const finishedChallenge = async (boardId: string) => {
    try {
        await prisma.challenge.updateMany({
            where: {
                board_id: boardId,
            },
            data: {
                finished: true,
            },
        });
        return true;
    } catch (error) {
        console.error("Error in finished challenge:", error);
        throw new Error(`Error in finished challenge: ${error}`);
    }
}

export const incrementAchievement = async (boardId: string) => {
    try {
        await prisma.$executeRaw`UPDATE "User"
    SET total_achievements = total_achievements + 1
    WHERE id IN (
      SELECT user_id
      FROM "Challenge"
      WHERE board_id = ${boardId}
    );`;

        return true;
    } catch (error) {
        console.error("Error in incrementing achievement:", error);
        throw new Error(`Error in incrementing achievement: ${error}`);
    }
}

export const updateRank = async () => {
    try {
        await prisma.$executeRaw`UPDATE "User"
    SET rank = 'A'
    WHERE total_achievements >= 100;`;

        await prisma.$executeRaw`UPDATE "User"
    SET rank = 'B'
    WHERE total_achievements >= 50 AND total_achievements < 100;`;

        await prisma.$executeRaw`UPDATE "User"
    SET rank = 'C'
    WHERE total_achievements >= 10 AND total_achievements < 50;`;

        await prisma.$executeRaw`UPDATE "User"
    SET rank = 'D'
    WHERE total_achievements >= 1 AND total_achievements < 10;`;

        await prisma.$executeRaw`UPDATE "User"
    SET rank = 'E'
    WHERE total_achievements = 0;`;

        return true;
    } catch (error) {
        console.error("Error in updating rank:", error);
        throw new Error(`Error in updating rank: ${error}`);
    }
}

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

export const checkBoardRegister = async (boardId: string) => {
    try {
        const board = await prisma.challenge.count({
            where: {
                board_id: boardId,
            },
        });

        const max = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
            select: {
                max: true,
            },
        });

        return !(max && board >= max.max)

    } catch (error) {
        console.error("Error in checking board:", error);
        throw new Error(`Error in checking board: ${error}`);
    }
}

export const registrationRequest = async (boardId: string, userId: string) => {
    let challenge: Prisma.ChallengeCreateInput
    challenge = {
        id: generateUUID(),
        challenger: { connect: { id: userId } },
        board: { connect: { id: boardId } },
    }
    try {
        await prisma.challenge.create({
            data: challenge,
        });
        console.log(await prisma.challenge.findMany())
        return true;
    } catch (error) {
        console.error("Error in registration request:", error);
        throw new Error(`Error in registration request: ${error}`);
    }
};

export const getChallengeByBoardId = async (boardId: string) => {
    try {
        const challenges = await prisma.challenge.findMany({
            where: {
                board_id: boardId,
            },
        });
        return challenges;
    } catch (error) {
        console.error("Error in getting challenge by board id:", error);
        throw new Error(`Error in getting challenge by board id: ${error}`);
    }
}

export const getChallengeByUserId = async (userId: string) => {
    try {
        const challenges = await prisma.challenge.findMany({
            where: {
                user_id: userId,
            },
        });
        return challenges;
    } catch (error) {
        console.error("Error in getting challenge by user id:", error);
        throw new Error(`Error in getting challenge by user id: ${error}`);
    }
}

export const getCheckChallengeByUserIdAndBoardId = async (userId: string, boardId: string) => {
    try {
        const challenge = await prisma.challenge.findFirst({
            where: {
                user_id: userId,
                board_id: boardId,
            }
        });
        return challenge;
    } catch (error) {
        console.error("Error in getting challenge by user id and board id:", error);
        throw new Error(`Error in getting challenge by user id and board id: ${error}`);
    }
}

export const getChallengeCount = async (boardId: string) => {
    try {
        const boardCount = await prisma.challenge.count({
            where: {
                board_id: boardId,
            },
        });
        return boardCount;
    } catch (error) {
        console.error("Error in getting board count:", error);
        throw new Error(`Error in getting board count: ${error}`);
    }
}