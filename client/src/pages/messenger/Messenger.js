import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from '../../context/AuthContext'
import "./messenger.css"

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState('')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const { user } = useContext(AuthContext)
  const scrollRef = useRef()

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id)
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id)
        setMessages(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getMessages()
  }, [currentChat._id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessageObj = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    try {
      const res = await axios.post("/messages/", newMessageObj)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <React.Fragment>
      <Topbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for friends' className='chatMenuInput' />
            {conversations && conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ?
              (<>
                <div className="chatBoxTop">
                  {messages && messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message key={m._id} message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  ))
                  }
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder='write something...'
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
              ) : (
                <span className="noConversationText">Open a conversation to start a chat</span>
              )
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Messenger