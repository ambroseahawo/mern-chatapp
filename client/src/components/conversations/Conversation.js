import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./conversation.css"

const Conversation = ({ conversation, currentUser  }) => {
  const [user, setUser] = useState([])
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() =>{
    const friendId = conversation.members.find((m) => m !== currentUser._id)

    const getUser = async() =>{
      try {
        const res = await axios("/users?userId=" + friendId)
        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  }, [conversation.members, currentUser._id])

  return (
    <div className='conversation'>
      <img className='conversationImg'
            src={ user.profilePicture ? user.profilePicture : publicFolder+"person/noAvatar.png" }
            alt="conversationDp" 
      />
      <span className="conversationName">{ user.username }</span>
    </div>
  )
}

export default Conversation