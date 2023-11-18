import { Challenge } from '@prisma/client'
import * as boardDB from '../../infra/board'
import { prismaMock } from '../../lib/singleton'

test('boardに紐づくchallengeをDBから取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const boards: Challenge[] = [
        {
            id: 'board_uuid',
            user_id: 'user_id',
            board_id: 'title',
            finished: false,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'board_uuid2',
            user_id: 'user_id',
            board_id: 'title',
            finished: true,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    prismaMock.challenge.findMany.mockResolvedValue(boards)

    await expect(boardDB.getChallengeByBoardId('board_uuid')).resolves.toEqual(boards)
})

test('依頼をuser_idで取得する', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const boards: Challenge[] = [
        {
            id: 'board_uuid',
            user_id: 'user_id',
            board_id: 'title',
            finished: false,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'board_uuid2',
            user_id: 'user_id',
            board_id: 'title',
            finished: true,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    prismaMock.challenge.findMany.mockResolvedValue(boards)

    await expect(boardDB.getChallengeByUserId('user_id')).resolves.toEqual(boards)
});