import axios from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"
import { socket } from "./privateChat"

export const ChatDashboard = () => {
   
   
   const [customers, setCustomers] = useState([])  
   
       
   useEffect(() => {

      //The loading element
      let loader = document.getElementById("loaderInbox")  
      
      let endpoints = [ 'http://localhost:5000/chat-messages/customers', 
                        'http://localhost:5000/chat-messages/latest-message']

      //Fetching all messages from the database      
      const fetchMessages = () => {  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                                                   (data) => {

                                                      let customerInfo = []

                                                      let firstPartInfo = data[0].data

                                                      let secondPartInfo = data[1].data
                                                      
                                                      for(let i=0; i < firstPartInfo.length; i++) {

                                                         let object = {...firstPartInfo[i], ...secondPartInfo[i]}

                                                         customerInfo.push(object)

                                                      }

                                                      setCustomers(customerInfo)                                                      


                                                      //Hide loading element when fetch the data
                                                      loader.style.display = 'none'
                                                   },
                                                )
                                       }
      
      
      fetchMessages()

      //Reevaluates unread messages on bellow listener
      socket.on('new message', () =>  fetchMessages() )     

      }, [])   

   const markAsRead = (sender) => {     
      
      socket.emit('message read', sender)
   } 
    
   return(<div className="chatDashboard">
            <div id="loaderInbox">Loading.....</div>
            <div id="chatWrapper">
               <ul className="messageList">
                  { customers.map( (item) => <li className={ item.Sender } >
                                                <a href= { "#/chat/"  } onClick={ () => markAsRead(item[0]) }>
                                                   <div className="chatMessageDetails">
                                                      <div>
                                                         <p>{ item.Customer}</p> 
                                                         <p>{ item.dateReceived}</p>
                                                      </div>               
                                                      <div>
                                                         <p>{ item.Message}</p>
                                                         <p className="unreadMessages">{ item.Sum }</p>
                                                      </div>                                       
                                                   </div>
                                                </a>
                                             </li>)
                                          }
               </ul>
            </div>
         </div>)
}