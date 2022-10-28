import "../css/specificOrder.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { socket } from "./privateChat"
import { generateOrderId } from "../functions/orders"
import { hideNotifications } from "../functions/navBar"

export const SpecificOrder = () => {

    const [ orderDetails, setOrderDetails ] = useState([])
    const [ name, setName ] = useState('')
    const [date, setDate ] = useState('')
    const [email, setEmail ] = useState('')
    const [phone, setPhone ] = useState('')
    const [currency, setCurrency ] = useState('')
    const [address, setAddress ] = useState('')
    const [ totalPrice, setTotalPrice ] = useState('')

    const params = useParams()
    

    useEffect(() => {

                let id = params.id

                //re-evaluates unchecked orders indicator in navbar
                socket.emit("order checked")

                //Fetching all the order's product details
                axios.get("http://localhost:5000/orders/order-with-id-" + id)
                     .then((res) => {
                         setOrderDetails(res.data)
                         setName(res.data[0].customerName)
                         setDate(res.data[0].date) 
                         setEmail(res.data[0].customerMail)
                         setPhone(res.data[0].phone)
                         setAddress(res.data[0].address)
                         setCurrency(res.data[0].currency)
                         })

                axios.get("http://localhost:5000/orders/price-of-" + id)
                     .then((res) => setTotalPrice(res.data.totalPrice))
               }, [] )

    return(<div className="specificOrder" onClick={ hideNotifications }>
              <div className="ordersWrapper">              
                <div className="header customerInfo">
                    <p className="ordersInfo"><b>Order Info</b></p>
                    <p><b>{ generateOrderId(params.id) }</b></p>
                </div>
                <h1 className="customerInfo receiver">Receiver:</h1>
                <div className="nameAndDate customerInfo">
                    <p className="specificName">{name}</p>
                    <p><b>Date/time received:</b> {date}</p>
                </div>
                <p className="customerInfo"><b>Email:</b> {email}</p>
                <p className="customerInfo"><b>Phone number:</b> {phone}</p>
                <p className="customerInfo specificAddress"><b>Address:</b> {address}</p>
                <table className="allOrdersTable" cellspacing="0">
                  <tr>
                    <th>ID</th>
                    <th style={{width: "35%"}}>Product</th>
                    <th>Quantity</th>
                    <th>Unit cost</th>
                    <th>Total</th>
                  </tr>
                  {orderDetails.map( item => <tr>
                                                <td>{ item.productId }</td>
                                                <td style={{width: "35%"}}>{ item.productName }</td>
                                                <td>{ item.quantity }</td>
                                                <td>{ item.unitPrice + " " + currency }</td>
                                                <td>{ item.price + " " + currency }</td>
                                             </tr>
                                            )
                                    }
                 <tr className="totalPriceRow">
                    <td></td>
                    <td style={{width: "35%"}}></td>
                    <td></td>
                    <td>Total Price:</td>
                    <td>{ totalPrice+ " " + currency  }</td>
                 </tr>
                </table>
              </div>
           </div>)
}