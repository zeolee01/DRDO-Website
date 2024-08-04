const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const xlsx = require("xlsx") //Driver for Xlsx files

app.use(express.json())
app.use(cors())
app.use(express.static("public")) //For image fetching

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
})

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

  if (!sentEmail || !sentUserName || !sentPassword) {
    return res.status(400).send({ message: "All fields are required" })
  }

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
      res.status(201).send({ message: "Notice added!" })
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

// Endpoint to add or update About Us content
app.post("/addabout", (req, res) => {
  const { id, content } = req.body

  if (id) {
    // Update existing content
    const SQL = "UPDATE about SET content = ? WHERE id = ?"
    const values = [content, id]
    db.query(SQL, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: err })
      } else {
        res.status(200).send({ id, content })
      }
    })
  } else {
    // Add new content
    const SQL = "INSERT INTO about (content) VALUES (?)"
    const values = [content]
    db.query(SQL, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: err })
      } else {
        res.status(201).send({ id: results.insertId, content })
      }
    })
  }
})

app.get("/getabout", (req, res) => {
  const SQL = "SELECT * FROM about ORDER BY id DESC"
  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(200).send(results)
    }
  })
})

//For image path uploading on database
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename
  const sql = "INSERT INTO images (image) VALUES (?)"
  const values = [image]
  db.query(sql, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(201).send({ message: "Image added!" })
    }
  })
})

app.get("/", (req, res) => {
  const sql = "SELECT * from images"
  db.query(sql, (err, result) => {
    if (err) {
      return res.json("Error")
    } else {
      return res.json(result)
    }
  })
})

//Fetching the employee database for employee card display
app.get("/employees", (req, res) => {
  const SQL = "SELECT id, username FROM employee"
  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(200).send(results)
    }
  })
})

//Admin delete Employee option
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) throw err
    res.sendStatus(204)
  })
})

//setup for uploading xlsx file into the database

//Open Excel File - Use First Worksheet
let workbook = xlsx.readFile("LibraryRecords.xlsx"),
  worksheet = workbook.Sheets[workbook.SheetNames[0]],
  range = xlsx.utils.decode_range(worksheet["!ref"])

//Import Excel File
for (let row = range.s.r; row <= range.e.r; row++) {
  //Read Cells
  let data = []
  for (let col = range.s.c; col <= range.e.c; col++) {
    let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })]
    data.push(cell.v)
  }

  //Insert into Database
  let sql = "INSERT INTO `library` (`BooksName`,`Availability`) VALUES (?,?)"
  db.query(sql, data, (err, results, fields) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("USER ID:" + results.insertId)
  })
}

// Search for a book by name
app.get("/search", (req, res) => {
  const bookName = req.query.name
  const SQL = "SELECT * FROM Library WHERE BooksName = ?"
  db.query(SQL, [bookName], (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else if (results.length > 0) {
      res.status(200).send(results[0])
    } else {
      res.status(404).send({ message: "Book not found!!!" })
    }
  })
})

// imagedelete
app.delete("/deleteimg/:id", (req, res) => {
  const id = req.params.id
  const SQL = "DELETE FROM images WHERE id = ?"
  const values = [id]
  db.query(SQL, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(204).send()
    }
  })
})
