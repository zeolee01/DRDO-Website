const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "plantdb",
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err)
    return
  }
  console.log("Connected to the database")
})

app.listen(3002, () => {
  console.log("Server is running on port 3002")
})

// Registration request to the database
app.post("/register", (req, res) => {
  const sentEmail = req.body.Email
  const sentUserName = req.body.UserName
  const sentPassword = req.body.Password

  const SQL =
    "INSERT INTO employee (email, username, password) VALUES (?, ?, ?)"
  const values = [sentEmail, sentUserName, sentPassword]
  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      // console.log("User inserted successfully!")
      res.status(201).send({ message: "User added!" })
    }
  })
})

// Admin Login with the stored credentials
app.post("/adminlogin", (req, res) => {
  const sentloginUserName = req.body.LoginUserName
  const sentloginPassword = req.body.LoginPassword

  const SQL = "SELECT * FROM users WHERE username= ? AND password = ?"
  const values = [sentloginUserName, sentloginPassword]

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else if (results.length > 0) {
      res.send(results)
    } else {
      res.status(401).send({ message: "Credentials don't match!" })
    }
  })
})

// Employee Login with the stored credentials
app.post("/employeelogin", (req, res) => {
  const sentloginUserName = req.body.LoginUserName
  const sentloginPassword = req.body.LoginPassword

  const SQL = "SELECT * FROM employee WHERE username= ? AND password = ?"
  const values = [sentloginUserName, sentloginPassword]

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else if (results.length > 0) {
      res.send(results)
    } else {
      res.status(401).send({ message: "Credentials don't match!" })
    }
  })
})

// data base for notice
app.post("/addnotice", (req, res) => {
  const sentNotice = req.body.content
  const sentType = req.body.type
  const SQL = "INSERT INTO notice (text, type) VALUES (?, ?)"
  const values = [sentNotice, sentType]
  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(201).send({ message: "User added!" })
    }
  })
})

// function to fetch notifications
app.get("/getnotice", (req, res) => {
  const SQL = "SELECT * FROM notice ORDER BY id DESC"

  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(200).send(results)
    }
  })
})

// deletetion of notice
app.delete("/deletenotice/:id", (req, res) => {
  const id = req.params.id
  const SQL = "DELETE FROM notice WHERE id = ?"
  const values = [id]
  db.query(SQL, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(204).send()
    }
  })
})

// upload image into corsal
const storage= multer.