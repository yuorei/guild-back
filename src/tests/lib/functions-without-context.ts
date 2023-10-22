import prisma from '../../lib/client'

interface CreateUser {
    id: string;
    name: string;
    email: string;
    password: string;
    rank: string;
    total_achievements: number;
    profileImageURL: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(user: CreateUser) {
    return await prisma.user.create({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            rank: user.rank,
            total_achievements: user.total_achievements,
            profileImageURL: user.profileImageURL,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    })
}
