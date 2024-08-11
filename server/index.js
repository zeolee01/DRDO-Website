const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx"); // Driver for XLSX files
const fs = require("fs");

app.use(express.json());
app.use(cors());
app.use(express.static("public")); // For image fetching

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "plantdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

// Registration request to the database
app.post("/register", (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  if (!sentEmail || !sentUserName || !sentPassword) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const SQL =
    "INSERT INTO employee (email, username, password) VALUES (?, ?, ?)";
  const values = [sentEmail, sentUserName, sentPassword];
  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(201).send({ message: "User added!" });
    }
  });
});

// Admin Login with the stored credentials
app.post("/adminlogin", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentloginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM users WHERE username= ? AND password = ?";
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

// Employee Login with the stored credentials
app.post("/employeelogin", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentloginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM employee WHERE username= ? AND password = ?";
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

// Database for notice
// data base for notice
app.post("/addnotice", (req, res) => {
  const sentNotice = req.body.content
  const sentType = req.body.type
  const sendDate = req.body.date
  const sendTime = req.body.time
  const SQL = "INSERT INTO notice (text, type, date, time) VALUES (?, ?, ?, ?)"
  const values = [sentNotice, sentType, sendDate, sendTime]
  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      res.status(201).send({ message: "Notice added!" })
    }
  })
})

// Function to fetch notifications
app.get("/getnotice", (req, res) => {
  const SQL = "SELECT * FROM notice ORDER BY id DESC";

  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send(results);
    }
  });
});

// Deletion of notice
app.delete("/deletenotice/:id", (req, res) => {
  const id = req.params.id;
  const SQL = "DELETE FROM notice WHERE id = ?";
  const values = [id];
  db.query(SQL, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

// Endpoint to add or update About Us content
app.post("/addabout", (req, res) => {
  const { id, content } = req.body;

  if (id) {
    // Update existing content
    const SQL = "UPDATE about SET content = ? WHERE id = ?";
    const values = [content, id];
    db.query(SQL, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ id, content });
      }
    });
  } else {
    // Add new content
    const SQL = "INSERT INTO about (content) VALUES (?)";
    const values = [content];
    db.query(SQL, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(201).send({ id: results.insertId, content });
      }
    });
  }
});

app.get("/getabout", (req, res) => {
  const SQL = "SELECT * FROM about ORDER BY id DESC";
  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send(results);
    }
  });
});

// For image path uploading on the database
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const sql = "INSERT INTO images (image) VALUES (?)";
  const values = [image];
  db.query(sql, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(201).send({ message: "Image added!" });
    }
  });
});

app.get("/", (req, res) => {
  const sql = "SELECT * from images";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json(result);
    }
  });
});

// Fetching the employee database for employee card display
app.get("/employees", (req, res) => {
  const SQL = "SELECT id, username FROM employee";
  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send(results);
    }
  });
});

// Delete an employee by their ID
app.delete("/deleteemployee/:id", (req, res) => {
  const id = req.params.id;
  const SQL = "DELETE FROM employee WHERE id = ?";
  db.query(SQL, [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

// Setup for uploading XLSX file into the database
app.post("/uploadxlsx", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const range = xlsx.utils.decode_range(worksheet["!ref"]);

  const existingBooksQuery = "SELECT BooksName, Availability FROM Library";
  db.query(existingBooksQuery, (err, existingBooks) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }

    const existingBooksMap = new Map();
    existingBooks.forEach((book) => {
      existingBooksMap.set(book.BooksName, book.Availability);
    });

    for (let row = range.s.r; row <= range.e.r; row++) {
      const data = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
        data.push(cell ? cell.v : null);
      }

      const [BooksName, Availability] = data;

      if (
        !existingBooksMap.has(BooksName) ||
        existingBooksMap.get(BooksName) !== Availability
      ) {
        const sql =
          "INSERT INTO `Library` (`BooksName`,`Availability`) VALUES (?,?)";
        db.query(sql, data, (err, results) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Book ID:" + results.insertId);
          }
        });
      }
    }

    fs.unlinkSync(filePath); // Remove the uploaded XLSX file after processing
    res.status(200).send({ message: "XLSX file processed and uploaded!" });
  });
});

// Search for a book by name
app.get("/search", (req, res) => {
  const bookName = req.query.name;
  const SQL = "SELECT * FROM Library WHERE BooksName = ?";
  db.query(SQL, [bookName], (err, results) =>

 {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
});

// Fetch all books and their availability
app.get("/allbooks", (req, res) => {
  const SQL = "SELECT * FROM Library";
  db.query(SQL, (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(results);
    }
  });
});

// Delete a book by its ID
app.delete("/deletebook/:id", (req, res) => {
  const id = req.params.id;
  const SQL = "DELETE FROM Library WHERE id = ?";
  db.query(SQL, [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});
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
