import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import "../css/chat.css"

export const ChatDashboard = () => {
   
   
   const [customers, setCustomers] = useState([])   
      
   useEffect(() => {

      axios.get('http://localhost:5000/chat-messages/customers')
      .then((res) => { let data = res.data
                        if(customers.length !== data.length) setCustomers(data)
                     })
   }, [setCustomers])   

   const markAsRead = (sender) => {
         
         axios.put('http://localhost:5000/chat-messages', { sender: sender })
   }
    
   return(<div className="chatDashboard">
            <ul>
               { customers.map( item => <li className={ item.Sender }>
                                            <a href= { "#/chat/" + item.Sender } onClick={ () => markAsRead(item.Sender) }>
                                                {item.Sender} <span>{ item.Sum }</span>
                                            </a>
                                        </li>)}
            </ul>
         </div>)
}