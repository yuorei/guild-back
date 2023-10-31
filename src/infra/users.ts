import prisma from '../lib/client';
import { User } from '../domain/user';

export const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch (error) {
        console.error("Error in getting all users:", error);
        throw new Error(`Error in getting all users: ${error}`);
    }
}

export const createUser = async (userInput: User) => {
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