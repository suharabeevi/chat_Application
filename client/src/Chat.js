import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './App.css';
function Chat({socket,Username,Room}) {
    const [currentmessege,setCurrentmessege]= useState("")
    const [messageList,setmessegeList]= useState([])

    const Sentmessege = async()=>{
        if(currentmessege!==""){
            const MessegeData ={
                room:Room,
                author:Username,
                messege :currentmessege,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_messege", MessegeData)
            setmessegeList((list)=>[...list,MessegeData])
        }
    }
    useEffect(()=>{
        socket.on("receive_messege",(data)=>{
setmessegeList((list)=>[...list,data])

        })
        return () => socket.removeListener('receive_messege')
    },[socket])
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>LIVE CHAT</p>
      </div>
      <div className='chat-body'></div>
      <ScrollToBottom className='message-container'>
      {messageList.map((messageContent)=>{
        return (
        <div className='message' id={Username === messageContent.author ? "you" : "other"}><div>
            <div className='message-content'>
                <p>{messageContent.messege}</p>
            </div>
            <div className='message-meta'>
                <p id='time'>{messageContent.time}</p>
                <p id='author'>{messageContent.author}</p>
            </div>
            </div>
            </div>
        )
      })}
      </ScrollToBottom>
      <div className='chat-footer'>
        <input type='text' placeholder='Enter the messege' onChange={(event)=>{
        setCurrentmessege(event.target.value)
        }}
        onKeyPress={(event)=>{
            event.key === "Enter" && Sentmessege()
        }}
         />
        <button className="button"onClick={Sentmessege}>&#127383;</button>
      </div>
    </div>
  )
}
export default Chat
