import axios from "axios"
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
    
   return(<div className="chatDashboard">
            <ul>
               { customers.map( item => <li><a href= { "#/chat/" + item.Customer }>{item.Customer}</a></li>)}
            </ul>
         </div>)
}