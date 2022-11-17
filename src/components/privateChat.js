import "../css/chat.css"
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { showMessage } from "../functions/chat";
import axios from "axios"   
import useStateWithCallback from 'use-state-with-callback';
import { hideNotifications } from "../functions/navBar"
import { LoadingSpinner } from "../components/loadingSpinner"
import { serverHost } from "../variables/variables";

//Initializing socket.io and url's parameter name object.
export const socket = io( serverHost )

/*Below component is dynamically generated in order to chat with
  a specific customer that sent us a message*/
export const PrivateChat = () => {
    
    //The state needed.
    const [messagesHistory, setMessagesHistory ] = useStateWithCallback([], () => window.scrollTo(0, document.body.scrollHeight) )
    
    const params = useParams();

    useEffect(() => {
                    //Holding customer's name from url in a variable.
                    let customer = params.customer

                    //The loading element
                    let loader = document.getElementById("loaderMessages")        
                    let userTyping = document.getElementById("userTyping")           
                    
                   //Fetching all the old messages to be displayed.
                    axios.get( serverHost + 'chat-messages' )
                         .then( res => {                              
                                        //Saving specific customer's fetched messages in a variable             
                                        let messages = res.data.filter(item => item.Customer === customer)

                                        if(messages.length > 0) window.scrollTo(0, document.body.scrollHeight)

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
                                                                        let date = data.date

                                                                        //Messages appended on screen
                                                                        sender !== 'admin' ? showMessage(sender, message,date) :
                                                                                             showMessage('me', message,date) 
                                                                        //Not showing new messages in navbar
                                                                        window.scrollTo(0, document.body.scrollHeight);

                                                                        console.log(date)
                                                                        
                                                                       /* When we receive messages with this component mounted,
                                                                         navbar message indicator should remain zero*/
                                                                        socket.emit('inbox zero', sender)
                                                                      }) 

                  //below listeners notify if a specific customer is typing or not
                  socket.on(params.customer + ' is typing', () => userTyping.style.display = 'initial') 
                  
                  socket.on(params.customer + ' not typing', () => userTyping.style.display = 'none') 

                  return () => {
                    socket.off('customer '+ params.customer)
                  }
                   
    }, [])
    
    //Below function is triggered to notify a specific customer that we are typing to him
    const userTyping = () => {

      let customer = params.customer
      let inputValue = document.getElementById('input').value

      inputValue === ''? socket.emit('Admin not typing', customer ) : socket.emit('Admin typing', customer )
    }

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
          socket.emit('Admin not typing', username )
          inputMessage.value = '';
          window.scrollTo(0, document.body.scrollHeight);
        }
    }

     return(<div className="chat" onClick={ hideNotifications }>
              <div id="loaderMessages">
                <LoadingSpinner />
              </div>
              <ul id="messages">                          
                { messagesHistory.map( item => <li className={"messageInfoWrapper colorOf"+ item.Sender}>
                                                  <div className="senderAndDate">
                                                   <p className="senderName">{(item.Sender === "admin" ? "me" : item.Sender)}</p>
                                                   <p className="sendDate">{item.dateReceived}</p>
                                                  </div>
                                                  <div className="messageTextWrapper">
                                                    <p className="messageText">&nbsp;{item.Message}</p>
                                                  </div>
                                               </li>) }    
              </ul> 
              <div id="userTyping">{params.customer + " is typing..."}</div>
              <form id="form" action="" onSubmit={sendMessage}>
                <input id="input" onChange={ userTyping } />
                <button id="sendButton">
                  <FontAwesomeIcon icon={ faPaperPlane } />
                </button>
              </form>
            </div>)
}