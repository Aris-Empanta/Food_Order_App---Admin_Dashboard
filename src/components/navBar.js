import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight,
          faTableColumns,
          faUtensils,
          faMotorcycle,
          faUsers,
          faComment
         } from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { socket } from "./privateChat";
import axios from 'axios'
import { catalogueChoices, 
         fetchUnread, 
         fetchUncheckedOrders, 
         focus } from "../functions/navBar";
 
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
                    <li id="firmWrapper">
                        <div id="logoWrapper">
                            <FontAwesomeIcon icon={ faLemon } id="logo"/>                            
                        </div>
                        <div>
                            <p class="restaurantName">Aris</p>
                            <p class="restaurantName">Restaurant</p>
                        </div>
                    </li>
                    <li id="dashboard"  className="navBarList">
                        <a href="#/" id="dashboardLink" onClick={ () => focus("dashboard", "dashboardLink") }>
                            < FontAwesomeIcon icon={ faTableColumns } className="navbarIcons" />
                            Dashboard
                        </a>
                    </li>
                    <li id="catalogue"  >
                        <div id="navCatalogue" className="navBarList" >                       
                            <p id="navProducts" onClick={ () => focus("navCatalogue") }>
                                < FontAwesomeIcon icon={ faUtensils } className="navbarIcons"/>
                                Products
                                <span>
                                    <button onClick={ catalogueChoices } id="expandArrow" >
                                        < FontAwesomeIcon icon={ faAngleRight } />
                                    </button>
                                </span>
                            </p>
                        </div>
                        <Link id="addProduct" className="products" to="add-product">Add Product</Link>
                        <Link id="preview" className="products" to="preview">Preview</Link>
                    </li>                  
                    <li id="orders"  className="navBarList">
                        <a href="#/orders" onClick={ () => focus("orders") }>
                            < FontAwesomeIcon icon={ faMotorcycle } className="navbarIcons" />
                            Orders <span id="newOrder">{ uncheckedOrders }</span>
                        </a>
                    </li>
                    <li id="customers"  className="navBarList">
                        <a href="#/customers"  onClick={ () => focus("customers") }>
                            < FontAwesomeIcon icon={ faUsers } className="navbarIcons" />
                            Customers
                        </a>
                    </li>
                    <li id="inbox"  className="navBarList">
                        <a  href="#/chat"  onClick={ () => focus("inbox") }>
                            < FontAwesomeIcon icon={ faComment } className="navbarIcons" />
                            Inbox <span id="newMessage">{ unreadMessages }</span>
                        </a>
                    </li>                    
                </ul>
            </div>
        )
}