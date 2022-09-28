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
              <div id="ordersListTitle"><h1>Orders' list</h1></div>
              <div id="ordersWrapper">
               <table className="ordersTable" cellspacing="0">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer's name</th>
                    <th>Address</th>
                    <th>Date received</th>
                    <th>Checked Status</th>
                    <th>Price</th>
                    <th>Check Order</th>
                  </tr>              
                { ordersDetails.map( item => <tr>                                               
                                                  <td>{ item.orderId }</td>
                                                  <td>{ item.customerName }</td>
                                                  <td>{ item.address }</td>
                                                  <td>{ item.date }</td>
                                                  <td>{ item.checkedStatus }</td>
                                                  <td>{ item.price }</td>
                                                  <td><a href={"#/orders/order-number-" + item.orderId} 
                                                      onClick={ () => markAsChecked(item.orderId) }> Check order </a>
                                                  </td>                                                  
                                              </tr>                                                                                                                               
                                            ) } 
                </table>
              </div>
           </div>)
}