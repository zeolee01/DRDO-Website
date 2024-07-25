import React, { useState, useEffect } from "react";
import "../../index.css";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [newNotice, setNewNotice] = useState({ content: "", type: "" });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getnotice");
        setNotices(response.data);
      } catch (error) {
        console.error(`error fetching notices:`, error);
        setError(error.message);
      }
    };
    fetchNotice();
  }, [notices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const addNotice = async (e) => {
    e.preventDefault();
    const { content: newNoti, type: newTy } = newNotice;
    setError(null);
    try {
      const response = await axios.post("http://localhost:3002/addnotice", {
        content: newNoti,
        type: newTy.toUpperCase(),
      });
      if (!response.ok) {
        throw new Error(`Failed to create notice: ${response.statusText}`);
      }
      setNewNotice({ content: "", type: "" });
      setNotices([...notices, response.data]);
      await fetchNotice();
    } catch (error) {
      console.error("There was an error creating the notice:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("There was a network error or unexpected issue.");
      }
    }
  };

  const removeNotice = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/deletenotice/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to delete notice: ${response.statusText}`);
      }
      console.log(response.data.message + " (Notice deleted!)");
      setNotices(notices.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error("There was an error deleting the notice:", error);
    }
  };

  return (
    <div className="py-20 w-full notice-background font-titillium">
      <h1 className="text-black text-4xl text-center pt-5 py-10 rounded-lg">
        Notifications
      </h1>
      <div className="w-full flex flex-col items-center">
        <div className="notice-list-container w-7/12 max-h-80 overflow-y-auto">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="notice-card bg-white p-6 mb-4"
              tabIndex="0"
            >
              <div className="flex justify-between items-center w-full">
                <div className="content">{notice.text}</div>
                <div className="flex items-center">
                  <div
                    className={`type ${
                      notice.type === "NEW" ? "text-white" : "text-white"
                    } bg-red-600 rounded-full px-2 py-1`}
                  >
                    {notice.type}
                  </div>
                  <button
                    onClick={() => removeNotice(notice.id)}
                    className="ml-2 px-2 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={addNotice}
          className="mt-6 text-center w-7/12"
          id={notices.length + 1}
        >
          <input
            type="text"
            name="content"
            value={newNotice.content}
            onChange={handleInputChange}
            placeholder="Enter notification"
            className="px-4 py-2 border rounded-lg w-full mb-2"
            required
          />
          <select
            name="type"
            value={newNotice.type}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg w-full mb-2"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="NEW">NEW</option>
            <option value="URGENT">URGENT</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
          >
            Add Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notice;