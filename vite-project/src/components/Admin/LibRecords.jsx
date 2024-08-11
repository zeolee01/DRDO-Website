import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../components/LibRecords.scss'; // Assuming you have a CSS/SCSS file for styles
// Assuming you have a CSS/SCSS file for styles

const LibRecords = () => {
  const [books, setBooks] = useState([]);
  const [newFile, setNewFile] = useState(null);
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

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deletebook/${id}`);
      fetchBooks(); // Refresh book list after deletion
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", newFile);

    try {
      await axios.post("http://localhost:3002/uploadxlsx", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchBooks(); // Refresh book list after file upload
    } catch (err) {
      console.error("Error uploading file:", err);
    }
    window.location.reload();
  };

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
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

        <form className="upload-form py-4" onSubmit={handleFileUpload}>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".xlsx" 
            className="file-input px-4 py-2 font-bold bg-white text-white rounded-lg hover:bg-gray-800 focus:outline-none bg-gradient-to-l from-gray-600 to-gray-800 hover:scale-110 transition-transform duration-300 ease-in-out" 
          />
          <button type="submit" className="px-6 py-2 font-bold bg-white text-white rounded-lg hover:bg-gray-800 focus:outline-none bg-gradient-to-l from-gray-600 to-gray-800 hover:scale-110 transition-transform duration-300 ease-in-out">Upload XLSX</button>
        </form>
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.BooksName}</td>
              <td>{book.Availability}</td>
              <td>
                <button 
                  onClick={() => deleteBook(book.id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibRecords;