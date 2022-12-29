/* const Sequelize = require("sequelize")

const sequelize = new Sequelize("mydigilearn_saas", "postgres", "MdlSaasDbDev123#", {
    host:"mydigilearn-dev.cccyh7piftcx.ap-southeast-3.rds.amazonaws.com",
    dialect:"postgres"
})

module.exports.connect = sequelize; */

const knex = require('knex');
const knexfile = require('./knexfile')
const {Model} = require('objection')

const setupDb = () => {
    const db = knex(knexfile.development)
    Model.knex(db)
}

module.exports = setupDb