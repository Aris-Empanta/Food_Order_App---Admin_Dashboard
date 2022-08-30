import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { socket } from "./privateChat";
import axios from 'axios'

export const NavBar = () => {

     const [ unreadMessages, setUnreadMessages ] = useState(0)
    /*I added useEffect, because otherwise the function catalogueChoices()
      works only on second click!*/
    useEffect(() => {
                        let addProduct = document.getElementById("addProduct")
                        let preview = document.getElementById("preview")
                        let newMessage = document.getElementById("newMessage")

                        addProduct.style.display = "none"
                        preview.style.display = "none" 
                        //if(unreadMessages === 0) newMessage.style.display = 'none'
                        
                        
                        axios.get('http://localhost:5000/chat-messages')
                             .then( res => {
                                        res.data.find(item => item.Read_status === 'unread' ? setUnreadMessages(prevAmount => prevAmount +1) : null )
                                    })
                        //Showing notification for every new message in real time
                        socket.on('new message', () => setUnreadMessages(prevAmount => prevAmount +1) )

                        socket.on('no new messages', () => setUnreadMessages(0))
                                                
                    }, [])

 
    
    //The function that shows and hide the cataloque submenu on nav-bar.
    const catalogueChoices = () => {

                                    let addProduct = document.getElementById("addProduct")
                                    let preview = document.getElementById("preview")
                                    let catalogue = document.getElementById("catalogue")
                                    let display = preview.style.display

                                    if(display === "none"){
                                        addProduct.style.display = "initial"
                                        preview.style.display = "initial"
                                        catalogue.style.height = "150px"
                                    } else {
                                        addProduct.style.display = "none"
                                        preview.style.display = "none"
                                        catalogue.style.height = "70px"
                                    }                                
                                }

    
    return( <div className="navBar">
                <ul>
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
                        <a href="#/">Orders</a>
                    </li>
                    <li>
                        <a href="#/">Customers</a>
                    </li>
                    <li >
                        <a  href="#/chat">Inbox <span id="newMessage">{ unreadMessages }</span></a>
                    </li>                    
                </ul>
            </div>
        )
}