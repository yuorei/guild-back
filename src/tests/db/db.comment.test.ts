import { Comment } from '@prisma/client'
import * as commentDB from '../../infra/comment'
import { prismaMock } from '../../lib/singleton'

test('すべてのコメントを取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comments: Comment[] = [
        {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'comment_id2',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    prismaMock.comment.findMany.mockResolvedValue(comments)

    await expect(commentDB.getAllComment()).resolves.toEqual(comments)
});