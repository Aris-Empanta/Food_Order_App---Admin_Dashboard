import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import { showMessage } from "../functions/chat";

export const PrivateChat = () => {

    const socket = io(`http://localhost:5000`)
    const params = useParams();

    useEffect(() => {
        socket.on('customer '+ params.customer, (msg)=> {
           
            showMessage(msg)
        })
    })

    const sendMessage = (e) => {
        e.preventDefault()

        let username = params.customer
        let message = "admin: " + document.getElementById("input").value
        let data = { username: username,
                     message: message
                    }
        
        socket.emit('chat message', data)
    }

     return(<div className="chat">
                <ul id="messages">                    
                </ul>
                <form id="form" action="" onSubmit={sendMessage}>
                    <input id="input" /><button>Send</button>
                </form>
            </div>)
}