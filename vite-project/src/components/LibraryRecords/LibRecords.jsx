
import React, { useState } from "react";
import axios from "axios";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/search`, {
        params: { name: searchTerm },
      });
      setSearchResult(response.data);
      setError("");
    } catch (err) {
      setError("Book not found");
      setSearchResult(null);
    }
  };

  return (
    <div>
      <h1>Library Book Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {searchResult && (
        <div>
          <button>Search Result:</button>
          
          <p>Book Name: {searchResult.BooksName}</p>
          <p>Availability: {searchResult.Availability}</p>
        </div>
      )}
    </div>
  );
};

export default BookSearch;