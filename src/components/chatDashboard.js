import axios from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"
import { socket } from "./privateChat"

export const ChatDashboard = () => {
   
   
   const [customers, setCustomers] = useState([])  
   
      
   useEffect(() => {

      //The loading element
      let loader = document.getElementById("loaderInbox")     

      //Fetching all messages from the database      
      const fetchMessages = () => {  axios.get('http://localhost:5000/chat-messages/customers')
                                          .then(res =>  {
                                                         let data = res.data.map(item => Object.values(item))
                                                         
                                                         data.map(item => {
                                                            if(item[1] == '0') {
                                                               item[1] = ''
                                                               item[2] = 'transparent'
                                                            } else {
                                                               item[2] = 'red'
                                                            }
                                                         })
                                                         console.log(data)
                                                         setCustomers(data)
                                                       
                                                         //Hide loading element when fetch the data
                                                         loader.style.display = 'none'            
                                                                           
                                                         })
                                          .catch((err) => console.log(err))
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
            <ul>
               { customers.map( (item, index ) => <li className={ item.Sender } >
                                            <a href= { "#/chat/" + item[0] } onClick={ () => markAsRead(item[0]) }>
                                                {item[0]} <span className="unreadMessages">{ item[1] }</span>
                                            </a>
                                        </li>)}
            </ul>
         </div>)
}