const faker = require('faker');
const { factory } = require('factory-girl');
const { user } = require('../src/app/models');
const bcrypt = require('bcrypt');

factory.define('user', user, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(10)),
    avatar_url: faker.internet.avatar()
});

module.exports = factory;