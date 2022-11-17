import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faTableColumns,
          faUtensils, faShoppingCart,
          faUsers, faBars,
          faComment, faBell} from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Notifications } from "./notifications"
import { socket } from "./privateChat";
import axios from 'axios' 
import { catalogueChoices, showHideNavbar,
         fetchUnread, fetchUncheckedOrders, 
         focus, soundNotification, 
         handleNavbar, handleNotifications,
         getNotifications } from "../functions/navBar";
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

                        // We set the position of the navbar depending on the screen size, so  
                        //that in smaller screens we the navbar shows with the first click.
                        handleNavbar()

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

    //We hide the navbar on screen resize
    window.addEventListener('resize', handleNavbar)

    return( <div className="navBar">
                <div id="darkBackground"></div>
                <ul id="navBarList">
                  <a href="#/" id="logoLink">
                    <li id="firmWrapper">                      
                        <div id="logoWrapper">
                            <FontAwesomeIcon icon={ faLemon } id="logo"/>                            
                        </div>
                        <div>
                            <p class="restaurantName">Snack Bar</p>
                            <p class="restaurantName">Dashboard</p>
                        </div>                    
                    </li> 
                  </a>
                    <li id="dashboard"  className="navBarList">
                        <a href="#/" id="dashboardLink"                          
                           onClick={ () => { focus("dashboard", "dashboardColor"); handleNavbar() }}>
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
                        <a id="addProduct" onClick={ handleNavbar}
                           className="products" href="#/add-product">Add Product</a>
                        <a id="preview" onClick={ handleNavbar}
                           className="products" href="#/all-categories">Preview</a>
                    </li>                  
                    <li id="orders"  className="navBarList">
                        <a href="#/orders"                         
                           onClick={ () => { focus("orders", "ordersColor"); handleNavbar() } }>
                            < FontAwesomeIcon icon={ faShoppingCart } className="navbarIcons ordersColor fontsColor" />
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
                           onClick={ () => { focus("customers", "customersColor"); handleNavbar() }}>
                            < FontAwesomeIcon icon={ faUsers } className="navbarIcons customersColor fontsColor" />
                            <span className="customersColor fontsColor">Customers</span>
                        </a>
                    </li>
                    <li id="inbox"  className="navBarList inboxColor">
                        <a  href="#/chat"                           
                            onClick={ () => { focus("inbox", "inboxColor"); handleNavbar() } }>
                            < FontAwesomeIcon icon={ faComment } className="navbarIcons inboxColor fontsColor" />
                            <span className="inboxColor fontsColor" > Chat </span>                            
                            <span className="inboxColor fontsColor" id="newMessage">
                                 { unreadMessages !== null && unreadMessages !== "" ?
                                 <div className="unreadMessages">{unreadMessages}</div> :
                                 unreadMessages } 
                            </span>                            
                        </a>
                    </li>                    
                </ul>
                <div id="smallScreenNavbar">
                    <button id="barsIcon" onClick={ showHideNavbar }>
                        <FontAwesomeIcon icon={ faBars }/> 
                    </button>
                    <a id="smallLogo" href="#">
                        <FontAwesomeIcon icon={ faLemon }/>                            
                    </a>
                    <button id="notifications" 
                            onClick={ handleNotifications }>
                        <FontAwesomeIcon icon={ faBell }/>   
                        { getNotifications(unreadMessages, uncheckedOrders) > 0 ? 
                        <div id="notificationsCircle">
                            <p>{ getNotifications(unreadMessages, uncheckedOrders) }</p>  
                        </div> 
                        : 
                        null
                        }                                        
                    </button>                                       
                </div>
                <Notifications />
                <audio id="orderNotification">
                    <source  src={orderNotification} type="audio/mp3" />
                </audio>
                <audio id="messageNotification">
                    <source  src={messageNotification} type="audio/mp3" />
                </audio>
            </div>
        )
}