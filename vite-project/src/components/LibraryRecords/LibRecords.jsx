
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
    <div className="font-titillium">
      <h1 className="font-bold py-4 px-4 font-titillium text-4xl flex justify-center">Library Book Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book name"
        className="w-50"
      />
      <div className="flex justify-center">
         <button onClick={handleSearch} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 flex justify-center">Search</button>
      </div>
      <div className="flex justify-center py-4 font-bold">
        {error && <p>{error}</p>}
        {searchResult && (
          <div>
            <button>Search Result:</button>
            
            <p>Book Name: {searchResult.BooksName}</p>
            <p>Availability: {searchResult.Availability}</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default BookSearch;