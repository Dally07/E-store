const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.CSecommDb,
    process.env.postgres,
    process.env.noah1112,
    {
        host: process.env.localhost,
        dialect: 'postgres'
    }
);

module.exports = { Sequelize };