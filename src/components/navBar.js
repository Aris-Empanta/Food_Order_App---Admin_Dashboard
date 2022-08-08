import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import "../css/navBar.css"


export const NavBar = () => {
    
    const catalogueChoices = () => {
       
        let addProduct = document.getElementById("addProduct")
        let preview = document.getElementById("preview")
        let catalogue = document.getElementById("catalogue")
        let display = preview.style.display

        if(display === "none"){
            addProduct.style.display = "initial"
            preview.style.display = "initial"
            catalogue.style.height = "140px"
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
                        <p>Catalogue&nbsp;<span><button onClick={ catalogueChoices } className="angleDown" >< FontAwesomeIcon icon={ faAngleDown } /></button></span></p>
                        <a id="addProduct" className="editCatalogue">Add Product</a>
                        <a id="preview" className="editCatalogue">Preview</a>
                    </li>
                    <li>
                        <a href="#/">Colors</a>
                    </li>
                    <li>
                        <a href="#/">Orders</a>
                    </li>
                    <li>
                        <a href="#/">Customers</a>
                    </li>
                    <li>
                        <a href="#/">Inbox</a>
                    </li>
                    <li>
                        <a href="#/">Chat</a>
                    </li>
                </ul>
            </div>
           )
}