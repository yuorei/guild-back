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
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'board_uuid2',
            user_id: 'user_id',
            board_id: 'title',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    prismaMock.challenge.findMany.mockResolvedValue(boards)

    await expect(boardDB.getChallengeByBoardId('board_uuid')).resolves.toEqual(boards)
})