import axios from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"
import { socket } from "./privateChat"
import { combineEndpoints, 
         markAsRead,
         renderName } from "../functions/chat"

export const ChatDashboard = () => {
   
   
   const [customers, setCustomers] = useState([])  
   
       
   useEffect(() => {

      //The loading element
      let loader = document.getElementById("loaderInbox")  
      
      let endpoints = [ 'http://localhost:5000/chat-messages/customers', 
                        'http://localhost:5000/chat-messages/latest-message']

      //Fetching all messages from the database      
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
      
      fetchMessages()

      //Reevaluates unread messages on bellow listener
      socket.on('new message', () =>  fetchMessages() ) 

      }, [])   

   
    
   return(<div className="chatDashboard">
            <div id="loaderInbox">Loading.....</div>
           
               <ul className="messageList"  id="chatWrapper">
               { customers.map( (item) => <li className={ item.Sender } >
                                             <a href= { "#/chat/" + item.Customer } 
                                                onClick={ () => markAsRead(socket, item.Customer) }
                                                className="messageLink">
                                                { item.Sum !== '0' ?   
                                                      <div className="chatMessageDetails">                                                                                                               
                                                         <p className="bold customersName">{ renderName(item.Customer) }</p>                                                                                                                 
                                                         <p className="bold customersMessage">{ item.Message}</p>                                             
                                                         <p className="unreadMessages">{ item.Sum }</p>  
                                                         <p className="bold">{ item.dateReceived}</p>                                                       
                                                      </div> 
                                                      :
                                                      <div className="chatMessageDetails">                                                      
                                                         <p className="normalFont customersName">{ renderName(item.Customer)}</p>                                                          
                                                         <p className="normalFont customersMessage">{ item.Message}</p>                                                   
                                                         <p></p>                                         
                                                         <p className="normalFont">{ item.dateReceived}</p>                                                                                                                                                   
                                                      </div>                                                
                                                   }
                                             </a>
                                          </li>)
                                       }
               </ul>
         
         </div>)
}