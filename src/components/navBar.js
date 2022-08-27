import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

export const NavBar = () => {

    /*I added useEffect, because otherwise the function catalogueChoices()
      works only on second click!*/
    useEffect(() => {
                        let addProduct = document.getElementById("addProduct")
                        let preview = document.getElementById("preview")
                        let newMessage = document.getElementById('newMessage')

                        addProduct.style.display = "none"
                        preview.style.display = "none"                                           
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
                        <a  href="#/chat" >Inbox <span id="newMessage"> new </span></a>
                    </li>                    
                </ul>
            </div>
           )
}