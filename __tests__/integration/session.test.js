
const factory = require('../factories');
const truncate = require('../utils/truncate');
const faker = require('faker');
const bcrypt = require('bcrypt');

const request = require('supertest');
const app = require('../../src/server.test');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const password = faker.internet.password();
        const password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const user = await factory.create('user', {
            password_hash
        });

        const response = await request(app)
            .post('/authentication/login')
            .send({
                email: user.email,
                password: password
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const password = faker.internet.password();
        const password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const user = await factory.create('user', {
            password_hash
        });

        const response = await request(app)
            .post('/authentication/login')
            .send({
                email: user.email,
                password: '123456'
            });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticated', async () => {
        const password = faker.internet.password();
        const password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const user = await factory.create('user', {
            password_hash
        });

        const response = await request(app)
            .post('/authentication/login')
            .send({
                email: user.email,
                password: password
            });

        expect(response.body).toHaveProperty('token');
    });
});