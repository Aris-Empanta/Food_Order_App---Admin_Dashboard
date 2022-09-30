import { useEffect, useState } from "react"
import "../css/orders.css"
import { socket } from "./privateChat"
import axios from "axios"
import { fetchOrders, markAsChecked, renderCharacters } from "../functions/orders"
import { useNavigate } from "react-router-dom";

export const Orders = () => {
 
    const [ ordersDetails, setOrdersDetails ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {                      
                      //The function to fetch all the orders sorted by order's id reversed
                      fetchOrders(axios, setOrdersDetails)

                      console.log(ordersDetails)
                      //Real time push notification for a new order
                      socket.on('new order', () => fetchOrders(axios, setOrdersDetails)) 
                    }, [])
   

    return(<div className="orders">
              <div id="ordersListTitle"><h1>Orders' list</h1></div>
              <div id="ordersWrapper">
               <table className="ordersTable" cellspacing="0">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer's name</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Date received</th>
                    <th>Total price</th>
                    <th>Check Order</th>
                  </tr>              
                { ordersDetails.map( item => <tr>                                               
                                                  <td className={item.checkedStatus }>{ item.orderId }</td>
                                                  <td className={item.checkedStatus }>{ renderCharacters(item.customerName) }</td>
                                                  <td className={item.checkedStatus }>{ renderCharacters(item.address) }</td>
                                                  <td className={item.checkedStatus }>{ item.phone }</td>
                                                  <td className={item.checkedStatus }>{ item.date }</td>
                                                  <td className={item.checkedStatus }>{ item.price }</td>
                                                  <td>
                                                      <button className={"checkOrderButton " + item.checkedStatus +"Order" }
                                                              onClick={ () => { markAsChecked(socket, item.orderId)
                                                                navigate("./order-number-" + item.orderId, { replace: false} )}
                                                                }>                                                                
                                                          Check order                                                             
                                                      </button>
                                                  </td>                                                  
                                              </tr>                                                                                                                               
                                            ) } 
                </table>
              </div>
           </div>)
}