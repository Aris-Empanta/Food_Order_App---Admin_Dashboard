import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect } from "react"
import { showMessage } from "../functions/chat";


export const Chat = () => {

   const socket = io(`http://localhost:5000`);

   useEffect( () => {

         socket.on('message', showMessage)

         socket.on("chat message", showMessage)

          //Grabing room name from customer and send it back to server   
         socket.on('roomName', (room) => {
            socket.emit("room", room)
            console.log(room)
         })
      }, []
   )  
  

   const sendMessage =  (e) => {
         e.preventDefault()
         
         let message = document.getElementById("input").value

         socket.emit("chat message", message)
   }   

   return(<div className="chat">
             <ul id="messages">
                <li>hey</li>
             </ul>
            <form id="form" action="" onSubmit={ sendMessage }>
            <input id="input" /><button>Send</button>
            </form>
           </div>)
}