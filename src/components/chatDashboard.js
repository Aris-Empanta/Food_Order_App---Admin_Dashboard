import axios from "axios"
import { useEffect, useState } from "react"

export const ChatDashboard = () => {
   
   const [messages, setMessages] = useState([])   
      
   useEffect(() => {

      axios.get('http://localhost:5000/chat-messages/customers').then((res) => { let names = []
                                                                                 for(let data of res.data){
                                                                                    names.push(data.Name)
                                                                                 } 
                                                                                 setMessages(names)  
                                                                                 
                                                                                    })
   }, [setMessages])   
    
   return(<div className="chatDashboard">
            <ul>
                  {messages.map(item => <li><a href={"#/chat/"+item} target="_blank">{item}</a></li>)}
            </ul>
         </div>)
}