import React, { useState, useEffect, useRef } from "react";
import "../../index.css";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [newNotice, setNewNotice] = useState({ content: "", type: "" });
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getnotice");
        setNotices(response.data);
      } catch (error) {
        console.error(`Error fetching notices:`, error);
        setError(error.message);
      }
    };
    fetchNotice();
  }, []);

  useEffect(() => {
    startScrolling();
  }, [notices]);

  const startScrolling = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animation = "scrollUp 5s linear infinite";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const addNotice = async (e) => {
    e.preventDefault();
    const { content: newNoti, type: newTy } = newNotice;
    setError(null);
    try {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");
      const formattedTime = currentDate.toLocaleTimeString();

      const response = await axios.post("http://localhost:3002/addnotice", {
        content: newNoti,
        type: newTy.toUpperCase(),
        date: formattedDate,
        time: formattedTime,
      });

      if (!response.ok) {
        throw new Error(`Failed to create notice: ${response.statusText}`);
      }
      setNewNotice({ content: "", type: "" });
      setNotices((prevNotices) => [...prevNotices, response.data]);
      startScrolling();
    } catch (error) {
      console.error("There was an error creating the notice:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("There was a network error or unexpected issue.");
      }
    }
    window.location.reload();
  };

  const removeNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deletenotice/${id}`);
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.id !== id)
      );
    } catch (error) {
      console.error("There was an error deleting the notice:", error);
    }
    window.location.reload();
  };

  return (
    <div className="  font-titillium">
      <h1 className="text-black text-5xl font-bold  text-center pt-2 py-2 rounded-lg ">
        NOTICE BOARD
      </h1>
      <div className="w-full flex flex-col items-center">
        <div id="notice-c" className="notice-list-container w-7/12 max-h-10 overflow-y-auto">
          <div className="notice-list-wrapper" ref={scrollRef}>
            {notices.map((notice, index) => (
              <div key={index} className="notice-card bg-white  p-10 mb-4" tabIndex="0">
                <div className="flex justify-between items-center w-full">
                  <div className="content">{notice.text}</div>
                  <div className="flex items-center">
                    <div
                      className={`type ${
                        notice.type === "URGENT" ? "bg-red-600" : "bg-yellow-500"
                      } text-white rounded-full px-2 py-1 w-20 justify-center flex`}
                    >
                      {notice.type}
                    </div>
                    <button
                      onClick={() => removeNotice(notice.id)}
                      className="ml-2 px-2 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                    >
                      Delete
                    </button>
                    <div className="pl-4">
                      <p className="italic text-base text-gray-500">
                        {notice.time}
                      </p>
                      <p className="italic text-sm text-gray-500">
                        {notice.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicating notices to create seamless scrolling */}
            {/* {notices.map((notice, index) => (
              <div key={`duplicate-${index}`} className="notice-card bg-white p-6 mb-4" tabIndex="0">
                <div className="flex justify-between items-center w-full">
                  <div className="content">{notice.text}</div>
                  <div className="flex items-center">
                    <div
                      className={`type ${
                        notice.type === "URGENT" ? "bg-red-600" : "bg-yellow-500"
                      } text-white rounded-full px-2 py-1 w-20 justify-center flex`}
                    >
                      {notice.type}
                    </div>
                    <button
                      onClick={() => removeNotice(notice.id)}
                      className="ml-2 px-2 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                    >
                      Delete
                    </button>
                    <div className="pl-4">
                      <p className="italic text-base text-gray-500">
                        {notice.time}
                      </p>
                      <p className="italic text-sm text-gray-500">
                        {notice.date}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>

        <form onSubmit={addNotice} className="mt-6 py-2 text-center w-7/12" id={notices.length + 1}>
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
            className="h-full px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
          >
            Add Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notice;