const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: console.log // This will show SQL queries
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.downloads = require("./download.model.js")(sequelize, DataTypes);

module.exports = db;