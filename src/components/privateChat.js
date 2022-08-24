import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import { showMessage } from "../functions/chat";

export const PrivateChat = () => {

    const socket = io(`http://localhost:5000`)
    const params = useParams();

    useEffect(() => {
        socket.on('customer '+ params.customer, (data)=> {  let sender = data.sender === 'admin' ? 'me' : data.sender
                                                            let message = data.message
                                                            showMessage(sender, message)
                                                        })
                    })

    const sendMessage = (e) => {
        e.preventDefault()

        let username = params.customer
        let message = document.getElementById("input").value
        let data = { username: username,
                     message: message,
                     sender: 'admin'
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