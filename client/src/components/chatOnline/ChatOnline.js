import React from 'react'
import "./chatOnline.css"

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src="https://i.pravatar.cc/150?img=33" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">August Lein</span>
      </div>
    </div>
  )
}

export default ChatOnline