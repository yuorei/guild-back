import prisma from '../lib/client';
import { CreateUser } from '../domain/user';

export const createUser = async (userInput: CreateUser) => {
    try {
        const user = await prisma.user.create({
            data: {
                ...userInput,
            },
        });
        return user;
    } catch (error) {
        console.error("Error in creating user:", error);
        throw new Error(`Error in creating user: ${error}`);
    }
};