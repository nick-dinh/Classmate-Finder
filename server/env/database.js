const mysql = require('mysql2')

const PORT = 3306;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pizza13",
    port: PORT,
    database:"chatdb" 
});

db.connect(function(err) {
    if (err) 
        throw err;
    console.log(`Database connected on localhost port ${PORT}`);
  });

module.exports = db;