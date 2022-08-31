import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { showMessage } from "../functions/chat";
import axios from "axios"   

//Initializing socket.io and url's parameter name object.
export const socket = io(`http://localhost:5001`)

/*Below component is dynamically generated in order to chat with
  a specific customer that sent us a message*/
export const PrivateChat = () => {
    
    //The state needed.
    const [messagesHistory, setMessagesHistory ] = useState([])
    
    const params = useParams();

    useEffect(() => {
                    //Holding customer's name from url in a variable.
                    let customer = params.customer

                    //The loading element
                    let loader = document.getElementById("loaderMessages")                    
                    
                   //Fetching all the old messages to be displayed.
                    axios.get('http://localhost:5000/chat-messages')
                         .then( res => {                              
                                        //Saving specific customer's fetched messages in a variable             
                                        let messages = res.data.filter(item => item.Customer === customer)

                                        //Pass above variable to the messages state
                                        if(messagesHistory.length !== messages.length) setMessagesHistory(messages)  

                                        //Hide loading element when fetch the data
                                        loader.style.display = 'none'

                                        //Updates the unread message indicator on navbar
                                        socket.emit('update navbar')
                                        })
                         .catch(err => console.log(err))
                    
                   //Handling the socket.io event that will send us a message from admin and displaying it.
                    socket.on('customer '+ params.customer, (data)=> {  let sender = data.sender === 'admin' ? 'me' : data.sender
                                                                        let message = data.message
                                                                        if(data.sender !== 'admin') showMessage(sender, message)
                                                                        //Not showing new messages in navbar
                                                                        window.scrollTo(0, document.body.scrollHeight);
                                                                        
                                                                       /* When we receive messages with this component mounted,
                                                                         navbar message indicator should remain zero*/
                                                                        socket.emit('inbox zero', sender)
                                                                      })                    
                   
    }, [])

    /*The function to send a message to a customer in real time,
      saving it in the database and displaying it.*/
    const sendMessage = (e) => {
        e.preventDefault()
        
        let inputMessage = document.getElementById("input")
        let username = params.customer
        let message = document.getElementById("input").value
        let data = {
                     username: username,
                     message: message,
                     sender: 'admin'
                    }
        
        if (inputMessage.value) {

          socket.emit('chat message', data)
          showMessage("me", message)
          inputMessage.value = '';
          window.scrollTo(0, document.body.scrollHeight);
        }
    }

     return(<div className="chat">
        <div id="loaderMessages">Loading.....</div>
                <ul id="messages">
                    
                    { messagesHistory.map( item => <li>{(item.Sender === "admin" ? "me" : item.Sender) + ": " + item.Message}</li>) }                    
                </ul>
                <form id="form" action="" onSubmit={sendMessage}>
                    <input id="input" /><button>Send</button>
                </form>
            </div>)
}