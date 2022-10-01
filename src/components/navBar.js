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
         focus,
         soundNotification } from "../functions/navBar";
import  orderNotification  from "../mp3/orderNotification.mp3";
import messageNotification from "../mp3/messageNotification.mp3"
 
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
                        fetchUnread( axios, setUnreadMessages)                        

                        //Reevaluates unread messages when receiving new message
                        socket.on('new message', () => { fetchUnread( axios, setUnreadMessages) 
                                                         soundNotification("messageNotification") }) 
                        
                        //Reevaluates unread messages  when admin's chat opens
                        socket.on('re-evaluate unread',  () => fetchUnread(axios, setUnreadMessages) )  

                        //Reevaluates unchecked orders  when receiving new order
                        socket.on('new order', () => { fetchUncheckedOrders(axios, setUncheckedOrders) 
                                                       soundNotification("orderNotification") })

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
                        <a href="#/" id="dashboardLink"                          
                           onClick={ () => focus("dashboard", "dashboardColor") }>
                            < FontAwesomeIcon icon={ faTableColumns } className="navbarIcons dashboardColor fontsColor" />
                            <span className="dashboardColor fontsColor" >Dashboard</span>
                        </a>
                    </li>
                    <li id="catalogue"  >
                        <div id="navCatalogue" className="navBarList" >                       
                            <p id="navProducts" onClick={ () => focus("navCatalogue", "productsColor") }>
                                < FontAwesomeIcon icon={ faUtensils } className="navbarIcons productsColor fontsColor"/>
                                <span className="productsColor fontsColor">Products</span>
                                <span>
                                    <button onClick={ catalogueChoices } id="expandArrow" >
                                        < FontAwesomeIcon icon={ faAngleRight } className="productsColor fontsColor"/>
                                    </button>
                                </span>
                            </p>
                        </div>
                        <Link id="addProduct" className="products" to="add-product">Add Product</Link>
                        <Link id="preview" className="products" to="all-categories">Preview</Link>
                    </li>                  
                    <li id="orders"  className="navBarList">
                        <a href="#/orders"                         
                           onClick={ () => focus("orders", "ordersColor") }>
                            < FontAwesomeIcon icon={ faMotorcycle } className="navbarIcons ordersColor fontsColor" />
                            <span className="ordersColor fontsColor" >Orders </span>                          
                            <span id="newOrder" className="ordersColor fontsColor">
                                { uncheckedOrders !== "" ?
                                 <div className="uncheckedOrders">{uncheckedOrders}</div> :
                                 uncheckedOrders }  
                            </span>                            
                        </a>
                    </li>
                    <li id="customers"  className="navBarList">
                        <a href="#/customers"                            
                           onClick={ () => focus("customers", "customersColor") }>
                            < FontAwesomeIcon icon={ faUsers } className="navbarIcons customersColor fontsColor" />
                            <span className="customersColor fontsColor">Customers</span>
                        </a>
                    </li>
                    <li id="inbox"  className="navBarList inboxColor">
                        <a  href="#/chat"                           
                            onClick={ () => focus("inbox", "inboxColor") }>
                            < FontAwesomeIcon icon={ faComment } className="navbarIcons inboxColor fontsColor" />
                            <span className="inboxColor fontsColor" > Chat </span>                            
                            <span className="inboxColor fontsColor" id="newMessage">
                                 { unreadMessages !== "" ?
                                 <div className="unreadMessages">{unreadMessages}</div> :
                                 unreadMessages } 
                            </span>                            
                        </a>
                    </li>                    
                </ul>
                <audio id="orderNotification">
                    <source  src={orderNotification} type="audio/mp3" />
                </audio>
                <audio id="messageNotification">
                    <source  src={messageNotification} type="audio/mp3" />
                </audio>
            </div>
        )
}