import * as boardDB from '../../infra/board'
import { prismaMock } from '../../lib/singleton'
import { Board } from '../../domain/board'

test('全てのboardをDBから取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const boards: Board[] = [
        {
            id: 'board_uuid',
            user_id: 'user_id',
            title: 'title',
            description: 'description',
            reward: 'reward',
            endDate: new Date(),
            level: 'level',
            max: 10,
            min: 1,
            imageURL: 'imageURL',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'board_uuid2',
            user_id: 'creator_id2',
            title: 'title2',
            description: 'description2',
            reward: 'reward2',
            endDate: new Date(),
            level: 'level2',
            max: 20,
            min: 2,
            imageURL: 'imageURL2',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ];

    prismaMock.board.findMany.mockResolvedValue(boards)

    await expect(boardDB.getAllBoard()).resolves.toEqual([
        {
            id: 'board_uuid',
            user_id: 'user_id',
            title: 'title',
            description: 'description',
            reward: 'reward',
            endDate: new Date(),
            level: 'level',
            max: 10,
            min: 1,
            imageURL: 'imageURL',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
        {
            id: 'board_uuid2',
            user_id: 'creator_id2',
            title: 'title2',
            description: 'description2',
            reward: 'reward2',
            endDate: new Date(),
            level: 'level2',
            max: 20,
            min: 2,
            imageURL: 'imageURL2',
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    ])
})

test('idを指定してboardをDBから取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const board: Board = {
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.board.findUnique.mockResolvedValue(board)

    await expect(boardDB.getBoardById('db_uuid')).resolves.toEqual({
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    })
})

test('user_idを指定してboardをDBから取得', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const board: Board = {
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.board.findMany.mockResolvedValue([board])
})


test('boardをDBに作成', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const board: Board = {
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.board.create.mockResolvedValue(board)

    await expect(boardDB.createBoard(board)).resolves.toEqual(true)
})

test('boardをDBに更新', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const board: Board = {
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.board.update.mockResolvedValue(board)

    await expect(boardDB.updateBoard(board)).resolves.toEqual(true)
})

test('boardをDBから削除', async () => {
    let createdAt = new Date()
    let updatedAt = new Date()
    const board: Board = {
        id: 'board_uuid',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: new Date(),
        level: 'level',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    prismaMock.board.delete.mockResolvedValue(board)

    await expect(boardDB.deleteBoard('board_uuid', "user_id")).resolves.toEqual(true)
})