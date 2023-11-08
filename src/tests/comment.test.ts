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