import request from 'supertest';
import app from '../server';
import * as commentDB from '../infra/comment';
import * as usersDB from '../infra/users';
import { User } from '../domain/user';
import { issueToken } from '../interface/auth';
import { Comment } from '@prisma/client';
// import nock from 'nock';

jest.mock('../infra/comment');
jest.mock('../infra/users');

const userInput: User = {
    id: 'db_uuid',
    name: 'yuorei',
    email: 'john@example.com',
    password: 'Password1234',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const token = issueToken(userInput);
// 認可のために必要なユーザー情報をモックする
(usersDB.getUserById as jest.Mock).mockResolvedValue(userInput);
(usersDB.createUser as jest.Mock).mockResolvedValue(userInput);

describe('すべてのコメントを取得: GET /comment', () => {
    it('すべてのコメントを取得: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComments = [
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
                user_id: 'user_id2',
                post_id: 'board_id2',
                content: 'comment2',
                createdAt: createdAt,
                updatedAt: updatedAt,
            },
        ];

        (commentDB.getAllComment as jest.Mock).mockResolvedValue(mockComments);

        const response = await request(app).get('/comment');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            comments: [
                {
                    id: 'comment_id',
                    user_id: 'user_id',
                    post_id: 'board_id',
                    content: 'comment',
                    createdAt: mockComments[0].createdAt,
                    updatedAt: mockComments[0].updatedAt,
                },
                {
                    id: 'comment_id2',
                    user_id: 'user_id2',
                    post_id: 'board_id2',
                    content: 'comment2',
                    createdAt: mockComments[1].createdAt,
                    updatedAt: mockComments[1].updatedAt,
                },
            ],
        });
    });
});

describe('コメントを作成: POST /comment', () => {
    it('コメントを作成: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.createComment as jest.Mock).mockResolvedValue(mockComment);

        const response = await request(app)
            .post('/comment')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: 'user_id',
                post_id: 'board_id',
                content: 'comment',
            });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });
});

describe('コメントを更新: PUT /comment/:id', () => {
    it('コメントを更新: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.updateComment as jest.Mock).mockResolvedValue(mockComment);

        const response = await request(app)
            .put('/comment/comment_id')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: 'user_id',
                post_id: 'board_id',
                content: 'comment',
            });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });
});

describe('コメントを削除: DELETE /comment/:id', () => {
    it('コメントを削除: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.deleteComment as jest.Mock).mockResolvedValue(mockComment);

        const response = await request(app)
            .delete('/comment/comment_id')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });
});

describe('コメントをIDで取得: GET /comment/:id', () => {
    it('コメントをIDで取得: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.getCommentById as jest.Mock).mockResolvedValue(mockComment);

        const response = await request(app).get('/comment/comment_id');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            comment: {
                id: 'comment_id',
                user_id: 'user_id',
                post_id: 'board_id',
                content: 'comment',
                createdAt: mockComment.createdAt,
                updatedAt: mockComment.updatedAt,
            },
        });
    });
});

describe('コメントをユーザーIDで取得: GET /comment/user/', () => {
    it('コメントをユーザーIDで取得: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.getCommentByUserId as jest.Mock).mockResolvedValue(
            mockComment
        );

        const response = await request(app)
            .get('/comment/user/')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            comment: {
                id: 'comment_id',
                user_id: 'user_id',
                post_id: 'board_id',
                content: 'comment',
                createdAt: mockComment.createdAt,
                updatedAt: mockComment.updatedAt,
            },
        });
    });
});

describe('コメントを投稿IDで取得: GET /comment/post/:id', () => {
    it('コメントを投稿IDで取得: 成功', async () => {
        const createdAt = new Date().toString();
        const updatedAt = new Date().toString();
        const mockComment = {
            id: 'comment_id',
            user_id: 'user_id',
            post_id: 'board_id',
            content: 'comment',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        (commentDB.getCommentByPostId as jest.Mock).mockResolvedValue(
            mockComment
        );

        const response = await request(app).get('/comment/post/board_id');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            "comments": mockComment
        });
    });
});