import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect } from "react"
import { serverMessage } from "../functions/chat";


export const Chat = () => {

   const socket = io(`http://localhost:5000`);

   useEffect( () => {
         socket.on('message', serverMessage)

         socket.on("chat message", serverMessage)

      }
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