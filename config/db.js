// config/db.js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'proyectos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.on('connection', () => {
  console.log('🟢 MySQL conectado');
});

module.exports = db;
