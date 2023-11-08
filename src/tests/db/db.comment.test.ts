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

test('コメントを作成', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.create.mockResolvedValue(comment)

    await expect(commentDB.createComment(comment)).resolves.toEqual(undefined)
});

test('コメントを更新', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.update.mockResolvedValue(comment)

    await expect(commentDB.updateComment(comment.id, comment)).resolves.toEqual(undefined)
});

test('コメントを削除', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.delete.mockResolvedValue(comment)

    await expect(commentDB.deleteComment(comment.id)).resolves.toEqual(undefined)
});

test('コメントをIDで取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.findUnique.mockResolvedValue(comment)

    await expect(commentDB.getCommentById(comment.id)).resolves.toEqual(comment)
});

test('コメントをユーザーIDで取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.findMany.mockResolvedValue([comment])

    await expect(commentDB.getCommentByUserId(comment.user_id)).resolves.toEqual([comment])
});

test('コメントを投稿IDで取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const comment: Comment = {
        id: 'comment_id',
        user_id: 'user_id',
        post_id: 'board_id',
        content: 'comment',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.comment.findMany.mockResolvedValue([comment])

    await expect(commentDB.getCommentByPostId(comment.post_id)).resolves.toEqual([comment])
});