const factory = require('../factories');
const truncate = require('../utils/truncate');
const faker = require('faker');
const bcrypt = require('bcrypt');

const models = require('../../src/app/models');

describe('User', () => {  
    beforeEach( async () => {
        await truncate();
    });

    afterAll(async done => {
        await models.sequelize.close();
        done();
    });

    it('should encrypt user password', async () => {
        const password = faker.internet.password();
        const password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const _user = await factory.create('user', {
            password_hash
        });

        const compareHash = await bcrypt.compare(password, _user.password_hash);

        expect(compareHash).toBe(true);
    });
});