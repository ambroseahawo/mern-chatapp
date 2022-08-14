import React from 'react'
import { format } from "timeago.js"
import "./message.css"

const Message = ({ message, own }) => {
  return (
    <div className={ own ? "message own": "message" }>
      <div className="messageTop">
        <img className="messageImg" src="https://i.pravatar.cc/150?img=14" 
              alt="senderdp" 
        />
        <p className="messageText">{ message.text }</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message