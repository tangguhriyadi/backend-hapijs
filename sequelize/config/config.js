module.exports = {
  development: {
    username: "postgres",
    password: "MdlSaasDbDev123",
    database: "mydigilearn_saas",
    host: "mydigilearn-dev.cccyh7piftcx.ap-southeast-3.rds.amazonaws.com",
    dialect: "postgres",
    dialectOptions:{
      ssl:{
        rejectUnauthorized:false
      }
    }
  },
  test: {
    username: "postgres",
    password: "MdlSaasDbDev123",
    database: "mydigilearn_saas",
    host: "mydigilearn-dev.cccyh7piftcx.ap-southeast-3.rds.amazonaws.com",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "MdlSaasDbDev123",
    database: "mydigilearn_saas",
    host: "mydigilearn-dev.cccyh7piftcx.ap-southeast-3.rds.amazonaws.com",
    dialect: "postgres"
  }
}
