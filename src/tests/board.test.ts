import request from 'supertest';
import app from '../server';
import * as boardDB from '../infra/board';
import * as usersDB from '../infra/users';
import { User } from '../domain/user';
import { issueToken } from '../interface/auth';
import { Board } from '@prisma/client';
// import nock from 'nock';

jest.mock('../infra/board');
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

describe('全てのボード取得API: GET /board', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = [
        {
            id: 'db_uuid',
            user_id: 'user_id',
            title: 'title',
            description: 'description',
            reward: 'reward',
            endDate: exdDate,
            level: 'level',
            max: 10,
            min: 1,
            imageURL: 'imageURL',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'db_uuid2',
            user_id: 'creator_id2',
            title: 'title2',
            description: 'description2',
            reward: 'reward2',
            endDate: exdDate,
            level: 'level2',
            max: 20,
            min: 2,
            imageURL: 'imageURL2',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    it('全てのボード取得API: 成功', async () => {
        (boardDB.getAllBoard as jest.Mock).mockResolvedValue(mockBoard);
        const response = await request(app).get('/board');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            boards: [
                {
                    id: 'db_uuid',
                    user_id: 'user_id',
                    title: 'title',
                    description: 'description',
                    reward: 'reward',
                    endDate: mockBoard[0].endDate,
                    level: 'level',
                    max: 10,
                    min: 1,
                    imageURL: 'imageURL',
                    createdAt: mockBoard[0].createdAt,
                    updatedAt: mockBoard[0].updatedAt,
                },
                {
                    id: 'db_uuid2',
                    user_id: 'creator_id2',
                    title: 'title2',
                    description: 'description2',
                    reward: 'reward2',
                    endDate: mockBoard[1].endDate,
                    level: 'level2',
                    max: 20,
                    min: 2,
                    imageURL: 'imageURL2',
                    createdAt: mockBoard[1].createdAt,
                    updatedAt: mockBoard[1].updatedAt,
                },
            ],
        });
    });
});

describe('ボード取得API: GET /board/:id', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'db_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('ボード取得API: 成功', async () => {
        (boardDB.getBoardById as jest.Mock).mockResolvedValue(mockBoard);

        const response = await request(app)
            .get('/board/db_uuid')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({
            board: {
                id: 'db_uuid',
                user_id: 'user_id',
                title: 'title',
                description: 'description',
                reward: 'reward',
                endDate: mockBoard.endDate,
                level: 'level',
                max: 10,
                min: 1,
                imageURL: 'imageURL',
                createdAt: mockBoard.createdAt,
                updatedAt: mockBoard.updatedAt,
            },
        });
    });
});

describe('ユーザーのボード取得API: GET /board/user', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoards = {
        boards: [
            {
                id: 'db_uuid',
                user_id: 'user_id',
                title: 'title',
                description: 'description',
                reward: 'reward',
                endDate: exdDate,
                level: 'level',
                max: 10,
                min: 1,
                imageURL: 'imageURL',
                createdAt: createdAt,
                updatedAt: updatedAt,
            },
            {
                id: 'db_uuid2',
                user_id: 'user_id',
                title: 'title2',
                description: 'description2',
                reward: 'reward2',
                endDate: exdDate,
                level: 'level2',
                max: 20,
                min: 2,
                imageURL: 'imageURL2',
                createdAt: createdAt,
                updatedAt: updatedAt,
            }
        ]
    };

    it('ユーザーのボード取得API: 成功', async () => {
        (boardDB.getBoardByUserId as jest.Mock).mockResolvedValue(mockBoards);

        const response = await request(app)
            .get('/board/user')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({
            "boards": {
                "boards": [
                    {
                        id: 'db_uuid',
                        user_id: 'user_id',
                        title: 'title',
                        description: 'description',
                        reward: 'reward',
                        endDate: mockBoards.boards[0].endDate,
                        level: 'level',
                        max: 10,
                        min: 1,
                        imageURL: 'imageURL',
                        createdAt: mockBoards.boards[0].createdAt,
                        updatedAt: mockBoards.boards[0].updatedAt,
                    },
                    {
                        id: 'db_uuid2',
                        user_id: 'user_id',
                        title: 'title2',
                        description: 'description2',
                        reward: 'reward2',
                        endDate: mockBoards.boards[1].endDate,
                        level: 'level2',
                        max: 20,
                        min: 2,
                        imageURL: 'imageURL2',
                        createdAt: mockBoards.boards[1].createdAt,
                        updatedAt: mockBoards.boards[1].updatedAt,
                    },
                ]
            }
        },
        );
    });
});

describe('ボード作成API: POST /board', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'db_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('ボード作成API: 成功', async () => {
        (boardDB.createBoard as jest.Mock).mockResolvedValue(mockBoard);

        const response = await request(app).post('/board')
            .send({
                user_id: 'user_id',
                title: 'title',
                description: 'description',
                reward: 'reward',
                endDate: exdDate,
                level: 'level',
                max: 10,
                min: 1,
                imageURL: 'imageURL',
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)

        expect(response.body).toEqual({});
    });
})

describe('ボード更新API: PUT /board/:id', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'db_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('ボード更新API: 成功', async () => {
        (boardDB.updateBoard as jest.Mock).mockResolvedValue(mockBoard);

        const response = await request(app).put('/board/db_uuid')
            .send({
                user_id: 'user_id',
                title: 'title',
                description: 'description',
                reward: 'reward',
                endDate: exdDate,
                level: 'level',
                max: 10,
                min: 1,
                imageURL: 'imageURL',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({});
    });
});

describe('ボード削除API: DELETE /board/:id', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'db_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('ボード削除API: 成功', async () => {
        (boardDB.deleteBoard as jest.Mock).mockResolvedValue(mockBoard);

        const response = await request(app)
            .delete('/board/db_uuid')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({});
    });
});
