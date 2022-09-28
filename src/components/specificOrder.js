import "../css/specificOrder.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { socket } from "./privateChat"

export const SpecificOrder = () => {

    const [ orderDetails, setOrderDetails ] = useState([])
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
                    console.log(res.data)})

                axios.get("http://localhost:5000/orders/price-of-" + id)
                     .then((res) => setTotalPrice(res.data.totalPrice))
               }, [] )

    return(<div className="specificOrder">
                {orderDetails.map( item => <div className="orderDetails">
                                                <img src={ item.imageName } className="orderImage"/>
                                                <div>
                                                    <p>{ item.productName } </p>
                                                    <p> quantity: { item.quantity }</p>
                                                    <p> price: {item.price}</p>
                                                </div>
                                           </div>)}
                <p>Total price: { totalPrice }</p>
           </div>)
}