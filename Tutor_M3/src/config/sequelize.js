// CONFIG YANG HARUS DISIAPKAN AGAR BISA MENGGUNAKAN SEQUELIZE
const Sequelize = require("sequelize");
// ISI DENGAN DATA DARI DB YANG AKAN DIHUBUNGKAN
const db = new Sequelize(
  'tutor_m3', // DB_NAME
  'root', // DB_USER
  '', // DB_PASSWORD
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    timezone: "+07:00",
  }
);

console.log('hehehhehe')

module.exports = {
  initDB: () => {
    return db.authenticate();
  },
  getDB: () => {
    return db;
  },
};
