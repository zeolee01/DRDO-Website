import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import '../index.css';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ content: "", type: "NEW" }); // Changed to use 'type' instead of 'date'
  const [editNoticeId, setEditNoticeId] = useState(null);
  const [editNotice, setEditNotice] = useState({ content: "", type: "" }); // Changed to use 'type' instead of 'date'

  const editRef = useRef();

  useEffect(() => {
    // Fetch notices from local storage when the component mounts
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
  }, []);

  const saveNoticesToLocalStorage = (notices) => {
    localStorage.setItem("notices", JSON.stringify(notices));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditNotice({ ...editNotice, [name]: value });
  };

  const addNotice = (e) => {
    e.preventDefault();
    const newId = notices.length > 0 ? notices[notices.length - 1].id + 1 : 1;
    const noticeToAdd = { id: newId, ...newNotice };
    const updatedNotices = [...notices, noticeToAdd];
    setNotices(updatedNotices);
    saveNoticesToLocalStorage(updatedNotices);
    setNewNotice({ content: "", type: "NEW" }); // Reset type to "NEW"
  };

  const removeNotice = (id) => {
    const updatedNotices = notices.filter(notice => notice.id !== id);
    setNotices(updatedNotices);
    saveNoticesToLocalStorage(updatedNotices);
  };

  const saveEdit = (id) => {
    const updatedNotices = notices.map(notice =>
      notice.id === id ? { ...notice, content: editNotice.content, type: editNotice.type } : notice
    );
    setNotices(updatedNotices);
    saveNoticesToLocalStorage(updatedNotices);
    setEditNoticeId(null);
    setEditNotice({ content: "", type: "" }); // Reset type
  };

  const handleClickOutside = (e) => {
    if (editRef.current && !editRef.current.contains(e.target)) {
      setEditNoticeId(null);
      setEditNotice({ content: "", type: "" }); // Reset type
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-20 w-full notice-background font-titillium">
      <h1 className="text-black text-4xl text-center pt-5 py-10 rounded-lg">
        Notifications
      </h1>
      <div className="w-full flex flex-col items-center">
        <div className="notice-list-container w-7/12 max-h-80 overflow-y-auto">
          {notices.map(notice => (
            <div
              key={notice.id}
              className="notice-card bg-white p-6 mb-4"
              tabIndex="0"
              ref={editNoticeId === notice.id ? editRef : null}
            >
              {editNoticeId === notice.id ? (
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="content"
                    value={editNotice.content}
                    onChange={handleEditInputChange}
                    className="px-4 py-2 border rounded-lg w-full mb-2"
                    placeholder="Enter new content"
                  />
                  <input
                    type="text"
                    name="type"
                    value={editNotice.type}
                    onChange={handleEditInputChange}
                    className="px-4 py-2 border rounded-lg w-full mb-2"
                    placeholder="NEW/UPDATE"
                  />
                  <div className="flex">
                    <button
                      onClick={() => saveEdit(notice.id)}
                      className="px-4 py-2 bg-green-500 text-black text-bold rounded-lg hover:bg-green-700 mr-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="content">
                    {notice.content}
                  </div>
                  <div className="flex items-center">
                    <div className={`type ${notice.type === 'NEW' ? 'text-white' : 'text-white'} bg-red-600 rounded-full px-2 py-1`}>
                      {notice.type}
                    </div>
                    <FaEdit
                      className="ml-2 cursor-pointer text-gray-500 hover:text-blue-700"
                      onClick={() => {
                        setEditNoticeId(notice.id);
                        setEditNotice({ content: notice.content, type: notice.type });
                      }}
                    />
                    <button
                      onClick={() => removeNotice(notice.id)}
                      className="ml-2 px-2 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={addNotice} className="mt-6 text-center w-7/12">
          <input
            type="text"
            name="content"
            value={newNotice.content}
            onChange={handleInputChange}
            placeholder="Enter notification"
            className="px-4 py-2 border rounded-lg w-full mb-2"
            required
          />
          <input
            type="text"
            name="type"
            value={newNotice.type}
            onChange={handleInputChange}
            placeholder="NEW/UPDATE"
            className="px-4 py-2 border rounded-lg w-full mb-2"
            required
          />
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