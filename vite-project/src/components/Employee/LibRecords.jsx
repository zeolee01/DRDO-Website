import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../components/LibRecords.scss'; // Assuming you have a CSS/SCSS file for styles

const LibRecords = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/allbooks");
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.BooksName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lib-records-container font-titillium">
      <div className="text-4xl font-bold flex justify-center py-5">Library Records</div>

      <div className="search-upload-container">
        <input 
          type="text" 
          placeholder="Search by book name..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-input"
        />
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.BooksName}</td>
              <td>{book.Availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibRecords;