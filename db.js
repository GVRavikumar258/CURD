const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'contactsdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

const createTable = `CREATE TABLE IF NOT EXISTS contacts (
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobileNumber VARCHAR(20) NOT NULL,
  dataStore VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
)`;

connection.query(createTable, (err, result) => {
  if (err) throw err;
  console.log('Contacts table created successfully!');
});

connection.end();
