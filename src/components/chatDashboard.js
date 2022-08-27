import axios from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"
import io from 'socket.io-client';

export const ChatDashboard = () => {
   
   
   const [customers, setCustomers] = useState([])  
   
   const socket = io(`http://localhost:5000`)
   
   useEffect(() => {

      //Fetching all messages from the database
      axios.get('http://localhost:5000/chat-messages/customers')
           .then(res =>  {
                              let data = res.data.map(item => Object.values(item))
                              setCustomers(data)
                           })    
   }, [])   

   const markAsRead = (sender) => {
         
         axios.put('http://localhost:5000/chat-messages', { sender: sender })
   }
    
   return(<div className="chatDashboard">
            <ul>
               { customers.map( item => <li className={ item.Sender }>
                                            <a href= { "#/chat/" + item[0] } onClick={ () => markAsRead(item[0]) }>
                                                {item[0]} <span>{ item[1] }</span>
                                            </a>
                                        </li>)}
            </ul>
         </div>)
}