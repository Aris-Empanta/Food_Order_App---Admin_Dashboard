import "../css/specificOrder.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { socket } from "./privateChat"
import { generateOrderId } from "../functions/orders"


export const SpecificOrder = () => {

    const [ orderDetails, setOrderDetails ] = useState([])
    const [ name, setName ] = useState('')
    const [date, setDate ] = useState('')
    const [email, setEmail ] = useState('')
    const [phone, setPhone ] = useState('')
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
                         })

                axios.get("http://localhost:5000/orders/price-of-" + id)
                     .then((res) => setTotalPrice(res.data.totalPrice))
               }, [] )

    return(<div className="specificOrder">
              <div className="ordersWrapper">              
                <div className="header">
                    <p>Order</p>
                    <p>{ generateOrderId(params.id) }</p>
                </div>
                <h1>Receiver:</h1>
                <div className="nameAndDate">
                    <p>{name}</p>
                    <p>Date/time received: {date}</p>
                </div>
                <p>Email: {email}</p>
                <p>Phone number: {phone}</p>
                <p>Address:</p>
                <p>{address}</p>
              </div>
           </div>)
}