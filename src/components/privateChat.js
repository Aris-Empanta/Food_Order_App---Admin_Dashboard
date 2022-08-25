import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { showMessage } from "../functions/chat";
import axios from "axios"

export const PrivateChat = () => {

    const [messagesHistory, setMessagesHistory ] = useState([])

    const socket = io(`http://localhost:5000`)
    const params = useParams();

    useEffect(() => {
                    let customer = params.customer 

                    axios.get('http://localhost:5000/chat-messages')
                         .then( res => {
                                        let messages = res.data.filter(item => item.Customer === customer)
                                        if(messagesHistory.length !== messages.length) setMessagesHistory(messages)                                       
                                        })
                    
                    socket.on('customer '+ params.customer, (data)=> {  let sender = data.sender === 'admin' ? 'me' : data.sender
                                                                        let message = data.message
                                                                        if(data.sender !== 'admin') showMessage(sender, message)
                                                                        console.log(0)
                                                                    })
                    
                    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        
        let username = params.customer
        let message = document.getElementById("input").value
        let data = { username: username,
                     message: message,
                     sender: 'admin'
                    }
        
        socket.emit('chat message', data)
        axios.post('http://localhost:5000/chat-messages', data )
        showMessage("me", message)
    }

     return(<div className="chat">
                <ul id="messages">
                    { messagesHistory.map( item => <li>{(item.Sender === "admin" ? "me" : item.Sender) + ": " + item.Message}</li>) }                    
                </ul>
                <form id="form" action="" onSubmit={sendMessage}>
                    <input id="input" /><button>Send</button>
                </form>
            </div>)
}