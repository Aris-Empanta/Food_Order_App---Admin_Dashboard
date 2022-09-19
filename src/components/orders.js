import { useEffect, useState } from "react"
import "../css/orders.css"
import { socket } from "./privateChat"
import axios from "axios"

export const Orders = () => {
 
    const [ ordersDetails, setOrdersDetails ] = useState([])

    useEffect(() => {
                      //The function to fetch all the orders sorted by order's id
                      const fetchOrders = () => {

                        axios.get("http://localhost:5000/orders/orders-by-id")
                           .then((res) => setOrdersDetails(res.data))
                      }
                      
                      fetchOrders()
                      //Real time push notification for a new order
                      socket.on('new order', () => fetchOrders()) 
                    }, [])
    //With below function, when we click on an order, it is marked as checked                
    const markAsChecked = (id) => {

      socket.emit('mark order checked', id)
    }

    return(<div className="orders">
                { ordersDetails.map( item => <a href={"#/orders/order-number-" + item.orderId} 
                                                onClick={ () => markAsChecked(item.orderId) }>  
                                               <div className="order">
                                                  <p>orderId: { item.orderId }</p>
                                                  <p>Name: { item.customerName }</p>
                                               </div> 
                                             </a>                                                                                  
                                              ) } 
           </div>)
}