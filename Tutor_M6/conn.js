const Sequelize = require("sequelize");
const db = new Sequelize(
    "tutor_ws_w6",
    "root",
    "",
    {
        host: "127.0.0.1",
        port: 3306,
        dialect: "mysql",
        logging: console.log,
        timezone: "+07:00",
    }
);

module.exports = {
    initDB: () => {
        return db.authenticate();
    },
    getDB: () => {
        return db;
    },
};
