import { useEffect, useState } from "react"
import "../css/orders.css"
import { socket } from "./privateChat"
import axios from "axios"
import { fetchOrders, markAsChecked, fetchOrdersSections,
         renderCharacters, generateOrderId } from "../functions/orders"
import { useNavigate } from "react-router-dom"; 
import { hideNotifications } from "../functions/navBar"

export const Orders = () => {
 
    const [ ordersDetails, setOrdersDetails ] = useState([])
    const [ ordersSections, setOrdersSections ] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {                      
                      //The function to fetch all the orders sorted by order's id reversed
                      fetchOrders(axios, 1, setOrdersDetails)

                      fetchOrdersSections(axios, setOrdersSections)
                      
                      //Real time push notification for a new order
                      socket.on('new order', () => { 
                                                      fetchOrders(axios, 1, setOrdersDetails)
                                                      fetchOrdersSections(axios, setOrdersSections)
                                                    })  
                    }, [])

    return(<div className="orders" onClick={ hideNotifications }>              
              <div id="ordersWrapper">
               <div id="ordersListTitle"><h1>Orders' list</h1></div>                             
               <div id="tableWrapper">
                <table className="ordersTable" cellSpacing="0"> 
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
                                                    <td className={item.checkedStatus }>{ generateOrderId(String(item.orderId)) }</td>
                                                    <td className={item.checkedStatus }>{ renderCharacters(item.customerName) }</td>
                                                    <td className={item.checkedStatus }>{ renderCharacters(item.address) }</td>
                                                    <td className={item.checkedStatus }>{ item.phone }</td>
                                                    <td className={item.checkedStatus }>{ item.date }</td>
                                                    <td className={item.checkedStatus }>{ item.totalPrice +" " + item.currency}</td>
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
                <div id="sectionButtonsWrapper">
                 { ordersSections.map( item => <button onClick={ () => { fetchOrders(axios, item, setOrdersDetails);
                                                                         fetchOrdersSections(axios, setOrdersSections)}  }
                                                        className="sectionButtons">
                                                                         { item } </button>) }
               </div> 
              </div>
           </div>)
}