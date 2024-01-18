import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
const socket = io.connect("http://localhost:3001")

function App() {
  const [Username,setUsername] = useState("")
  const [Room,setRoom] =useState("")
  const [showChat, setShowChat] =useState(false)
  const joinRoom =()=>{
if(Username!==""&& Room!==""){
  socket.emit("join_room",Room)
  setShowChat(true)
}
  }
  return (
    <div className="App">
      {!showChat ?(
      <div className='joinChatContainer'>
     <h3>Join A Chat</h3>
     <input type='text' placeholder='john....'onChange={(event)=>{
      setUsername(event.target.value)
     }}/>
     <input type='text' placeholder='Room Id' onChange={(event)=>{
      setRoom(event.target.value)
     }}/>
     <button onClick={joinRoom}>Join A Room</button>
     </div>
      ) :(
  <Chat socket={socket} Username={Username} Room={Room}/>
  )}
    </div>
    
  );
}

export default App;
