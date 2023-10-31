import { getAllUser, createUser } from '../infra/users'
import { prismaMock } from '../lib/singleton'

test('should get all users', async () => {
  const users = [
    {
      id: 'db_uuid',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'db_uuid2',
      name: 'Jane Doe',
      email: 'john2@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  prismaMock.user.findMany.mockResolvedValue(users)

  await expect(getAllUser()).resolves.toEqual([
    {
      id: 'db_uuid',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'db_uuid2',
      name: 'Jane Doe',
      email: 'john2@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
})

test('should create new user ', async () => {
  let ct = new Date()
  let ut = new Date()
  const user = {
    id: "db_uuid",
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: ct,
    updatedAt: ut,
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: "db_uuid",
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: ct,
    updatedAt: ut,
  })
})
