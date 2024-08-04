import React, { useState, useEffect, useRef } from "react"
import "../../index.css"
import axios from "axios"

const Notice = () => {
  const [notices, setNotices] = useState([])
  const [error, setError] = useState(null)
  const [newNotice, setNewNotice] = useState({ content: "", type: "" })

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getnotice")
        setNotices(response.data)
      } catch (error) {
        console.error(`error fetching notices:`, error)
        setError(error.message)
      }
    }
    fetchNotice()
  }, [notices])

  return (
    <div className="py-20 w-full notice-background font-titillium">
      <h1 className="text-black text-4xl text-center pt-5 py-10 rounded-lg">
        Notifications
      </h1>
      <div className="w-full flex flex-col items-center">
        {/* check----- */}
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
                      notice.type === "URGENT" ? "bg-red-600" : "bg-yellow-500"
                    } text-white rounded-full px-2 py-1 w-20 justify-center flex`}
                  >
                    {notice.type}
                  </div>
                  <div className="pl-4">
                    <p className="italic text-base text-gray-500	">
                      {notice.time}
                    </p>
                    <p className="italic text-sm	text-gray-500">
                      {notice.date}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notice
