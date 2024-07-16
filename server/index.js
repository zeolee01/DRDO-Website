const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'plantdb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

// Registration request to the database
app.post('/register', (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  const values = [sentEmail, sentUserName, sentPassword];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      console.log('User inserted successfully!');
      res.status(201).send({ message: 'User added!' });
    }
  });
});

// Login with the stored credentials
app.post('/login', (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentloginPassword = req.body.LoginPassword;

  const SQL = 'SELECT * FROM users WHERE username= ? AND password = ?';
  const values = [sentloginUserName, sentloginPassword];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else if (results.length > 0) {
      res.send(results);
    } else {
      res.status(401).send({ message: "Credentials don't match!" });
    }
  });
});