import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { showMessage } from "../functions/chat";
import axios from "axios"

/*Below component is dynamically generated in order to chat with
  a specific customer that sent us a message*/
export const PrivateChat = () => {
    
    //The state needed.
    const [messagesHistory, setMessagesHistory ] = useState([])
    
    //Initializing socket.io and url's parameter name object.
    const socket = io(`http://localhost:5000`)
    const params = useParams();

    useEffect(() => {
                    //Holding customer's name from url in a variable.
                    let customer = params.customer 

                    //Fetching all the old messages to be displayed.
                    axios.get('http://localhost:5000/chat-messages')
                         .then( res => {
                                        let messages = res.data.filter(item => item.Customer === customer)
                                        if(messagesHistory.length !== messages.length) setMessagesHistory(messages)                                       
                                        })
                    
                    //Handling the socket.io event that will send us a message from admin and displaying it.
                    socket.on('customer '+ params.customer, (data)=> {  let sender = data.sender === 'admin' ? 'me' : data.sender
                                                                        let message = data.message
                                                                        if(data.sender !== 'admin') showMessage(sender, message)
                                                                    })
                    
                    }, [])
    /*The function to send a message to a customer in real time,
      saving it in the database and displaying it.*/
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