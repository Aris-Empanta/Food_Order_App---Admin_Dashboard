import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown,
          faPizzaSlice } from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { socket } from "./privateChat";
import axios from 'axios'
import { catalogueChoices, fetchUnread, fetchUncheckedOrders } from "../functions/navBar";
 
export const NavBar = () => {

     const [ unreadMessages, setUnreadMessages ] = useState("")
     const [ uncheckedOrders, setUncheckedOrders ] = useState("")
    
    useEffect(() => {
                        let addProduct = document.getElementById("addProduct")
                        let preview = document.getElementById("preview")

                        addProduct.style.display = "none"
                        preview.style.display = "none"

                        //Fetching new unchecked orders
                        fetchUncheckedOrders(axios, setUncheckedOrders)
                        
                        //Fetching unread messages number on component render
                        fetchUnread(axios, setUnreadMessages)                        

                        //Reevaluates unread messages when receiving new message
                        socket.on('new message', () => fetchUnread(axios, setUnreadMessages) ) 
                        
                        //Reevaluates unread messages  when admin's chat opens
                        socket.on('re-evaluate unread',  () => fetchUnread(axios, setUnreadMessages) )  

                        //Reevaluates unchecked orders  when receiving new order
                        socket.on('new order', () => fetchUncheckedOrders(axios, setUncheckedOrders) )

                        //Reevaluates unchecked orders when we open an order
                        socket.on('re-evaluate orders', () => fetchUncheckedOrders(axios, setUncheckedOrders) )
                    }, [])

    return( <div className="navBar">
                <ul>
                    <li>
                        <div id="logoWrapper">
                            <FontAwesomeIcon icon={ faLemon } id="logo"/>
                        </div>
                    </li>
                    <li>
                        <a href="#/">Dashboard</a>
                    </li>
                    <li id="catalogue">
                        <p>Products
                            <span>
                                <button onClick={ catalogueChoices } className="angleDown" >
                                    < FontAwesomeIcon icon={ faAngleDown } />
                                </button>
                            </span>
                        </p>
                        <Link id="addProduct" className="products" to="add-product">Add Product</Link>
                        <Link id="preview" className="products" to="preview">Preview</Link>
                    </li>                  
                    <li>
                        <a href="#/orders"> Orders <span id="newOrder">{ uncheckedOrders }</span></a>
                    </li>
                    <li>
                        <a href="#/customers">Customers</a>
                    </li>
                    <li >
                        <a  href="#/chat">Inbox <span id="newMessage">{ unreadMessages }</span></a>
                    </li>                    
                </ul>
            </div>
        )
}