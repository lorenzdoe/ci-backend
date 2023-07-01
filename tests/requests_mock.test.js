const request = require('supertest');
const db = require('../db/db');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Test HTTP calls mocked db', () => {
    
    const mockUser = { username: 'Mockingbird', password: 'Mockword' };
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    describe('POST /users', () => {
        jest.mock('../db/db');
        test('create user - username does not exist', async () => {
            // Mocks
            let findByPkSpy = jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(null);
            let createSpy = jest.spyOn(db.models.user, 'create').mockResolvedValue(mockUser);
    
            // Arrange
            let testUser = {
                username: 'Mockingbird',
                password: 'Mockword'
            };

            // Act
            let response = await request(app)
                .post('/users')
                .send(testUser);
    
            // Assert
            expect(response.statusCode).toBe(201);
            expect(response.body.username).toBe(testUser.username);
            expect(findByPkSpy).toHaveBeenCalledTimes(1);
            expect(findByPkSpy).toHaveBeenCalledWith(testUser.username);
            expect(createSpy).toHaveBeenCalledTimes(1);
            }
        );

        test('create user - username already exists', async () => {
            // Mocks
            let findByPkSpy = jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(mockUser);
            let createSpy = jest.spyOn(db.models.user, 'create').mockResolvedValue(mockUser);
    
            // Arrange
            let testUser = {
                username: 'Mockingbird',
                password: 'Mockword'
            };

            // Act
            let response = await request(app)
                .post('/users')
                .send(testUser);
    
            // Assert
            expect(response.statusCode).toBe(400);
            expect(response.body.username).toBe(undefined);
            expect(findByPkSpy).toHaveBeenCalledTimes(1);
            expect(findByPkSpy).toHaveBeenCalledWith(testUser.username);
            expect(createSpy).toHaveBeenCalledTimes(0);
    
            }
        );

        test('create user - password too short', async () => {
            // Mock
            let findByPkSpy = jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(mockUser);
            let createSpy = jest.spyOn(db.models.user, 'create').mockResolvedValue(mockUser);
    
            // Arrang
            let testUser = {
                username: 'Mockingbird',
                password: '1234'
            };

            // Act
            let response = await request(app)
                .post('/users')
                .send(testUser);
    
            expect(response.statusCode).toBe(400);
            expect(response.body.username).toBe(undefined);
            expect(response.body.errors[0].param).toBe('password');
            expect(findByPkSpy).toHaveBeenCalledTimes(0);
            expect(createSpy).toHaveBeenCalledTimes(0);
    
            }
        );
    });

    describe('POST /sessions', () => {
        test('login user - should work', async () => {
            // Arrange
            let testUser = {
                username: 'Mockingbird',
                password: 'Mockword'
            };
            
            // Mocks
            let findByPkSpy = jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(testUser);
    
            // Act
            let response = await request(app)
                .post('/sessions')
                .send(testUser);
            // verify that token valid
            const decode = jwt.verify(response.body.token, process.env.TOKEN_SECRET);
            const gotUsername = decode.username;
    
            // Assert
            expect(response.statusCode).toBe(200);
            expect(gotUsername).toBe(testUser.username);
            expect(findByPkSpy).toHaveBeenCalledTimes(1);
            expect(findByPkSpy).toHaveBeenCalledWith(testUser.username);
        }
        );

        test('login user - wrong credentials', async () => {
            // Mocks
            let findByPkSpy = jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(mockUser);

            // Arrange
            let testUser = {
                username: 'Mockingbird',
                password: 'wrongPw'
            };
    
            // Act
            let response = await request(app)
                .post('/sessions')
                .send(testUser);
    
            // Assert
            expect(response.statusCode).toBe(401);
            expect(findByPkSpy).toHaveBeenCalledTimes(1);
            expect(findByPkSpy).toHaveBeenCalledWith(testUser.username);
        }
        );
    });

    describe('CREATE TODO', () => {
        test('login, create', async () => {
            // Arrange
            let testUser = {
                username: 'Mockingbird',
                password: 'Mockword'
            };
            let todo = {
                name: 'buy milk'
            };
                // Mock
            jest.spyOn(db.models.user, 'findByPk').mockResolvedValue(testUser);
            jest.spyOn(db.models.todo, 'create').mockResolvedValue(todo);
            let arrangeResponse = await request(app)
                .post('/sessions')
                .send(testUser);
            let token = arrangeResponse.body.token;
            
            // Act
            let response = await request(app)
                .post('/todos')
                .set('Authorization', `Baerer ${token}`)
                .send(todo);

            
            // Assert
            expect(response.statusCode).toBe(201);
        }
        );
    });

});