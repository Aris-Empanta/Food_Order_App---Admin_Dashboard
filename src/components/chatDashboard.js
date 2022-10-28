import axios from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"
import { socket } from "./privateChat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {  markAsRead, combineEndpoints,
         renderName, renderMessage,
         selectMessage, selectAllMessages,
         markAsUnread, deleteSelected, 
         searchConversation } from "../functions/chat"

export const ChatDashboard = () => {   
   
   //State needed
   const [customers, setCustomers] = useState([])  
   const [markedMessages, setMarkedMessages] = useState([])
   
       
   useEffect(() => {

         //The loading element
         let loader = document.getElementById("loaderInbox")  
         
         let endpoints = [ 'http://localhost:5000/chat-messages/customers', 
                           'http://localhost:5000/chat-messages/latest-message']

              
         const fetchMessages = () => {  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                                                      (response) => {

                                                         //We combine the data from the endpoints and 
                                                         // save them to the state
                                                         combineEndpoints(response, setCustomers)

                                                         //Hide loading element when fetch the data
                                                         loader.style.display = 'none'
                                                      }, 
                                                   )
                                          } 

         //Fetching all messages from the database 
         fetchMessages()

         //Reevaluates unread messages on bellow listener
         socket.on('new message', () =>  fetchMessages()) 

      }, [])       
    
   return(<div className="chatDashboard components">
            <div id="chatTitle">
               <h1>Chat messages</h1>
            </div>
            <div id="deleteMessageWrapper">
               <input type="checkbox" id="selectAll"
                      onClick={() => selectAllMessages(setMarkedMessages, customers)}/>
               <p id="selectAll">Select all</p>               
               <button id="markUnread" onClick={ () => markAsUnread(axios, markedMessages) }> 
                    Mark as unread 
               </button>
               <button id="deleteButton" onClick={ () => deleteSelected(axios, markedMessages) }> 
                    Delete <FontAwesomeIcon icon={faTrash} />
               </button>
               <div id="searchMessageWrapper">
                  <input type="text" id="searchMessage" placeholder="Customer's name"/>
                  <button id="searchMessageButton" onClick={ searchConversation }>
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </div>
            </div>
            <div id="loaderInbox">
               <div className="loading-spinner">
               </div>
            </div>
            <ul className="messageList"  id="chatWrapper">
            { customers.map( (item) => <li className={ item.Sender + " chatList"} >
                                          <div className="checkbox">
                                             <input type="checkbox" className="checkBoxes" id={"check" + item.Customer} 
                                                    onClick={() => selectMessage( setMarkedMessages,
                                                                                  markedMessages,
                                                                                  item.Customer, 
                                                                                  "check" + item.Customer )}/>
                                          </div>
                                          <a href= { "#/chat/" + item.Customer } 
                                             onClick={ () => markAsRead(socket, item.Customer) }
                                             className="messageLink"
                                             id={"messageLink" + item.Customer}>
                                             { item.Sum !== '0' ?   
                                                   <div className="chatMessageDetails">                                                                                                               
                                                      <p className="bold customersName">{ renderName(item.Customer) }</p>                                                                                                                 
                                                      <p className="bold customersMessage">{ renderMessage(item.Message) }</p>     
                                                      <p className="unreadMessages">{ item.Sum }</p>                                               
                                                      <p className="bold">{ item.dateReceived}</p>                                                       
                                                   </div> 
                                                   :
                                                   <div className="chatMessageDetails">                                                      
                                                      <p className="normalFont customersName">{ renderName(item.Customer)}</p>                                                          
                                                      <p className="normalFont customersMessage">{ renderMessage(item.Message) }</p>      
                                                      <p></p>                                                                                                      
                                                      <p className="normalFont">{ item.dateReceived}</p>                                                                                                                                                   
                                                   </div>                                                
                                                }
                                          </a>
                                       </li>) }
            </ul>      
         </div>)
}