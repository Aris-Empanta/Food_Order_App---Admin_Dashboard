import "../css/addProduct.css"
import axios from "axios"
import { useState } from  'react'

export const AddProduct = () => {

       const addProduct = () => {

            let category = document.getElementById("categoryInput").value
            let name = document.getElementById("nameInput").value
            let currency = document.getElementById("currencySelect").value
            let quantity = document.getElementById("quantityInput").value
            let deliveryPrice = document.getElementById("deliveryInput").value
            let takeAwayPrice = document.getElementById("takeAwayInput").value
            let description = document.getElementById("descriptionInput").value
            let image = document.getElementById("imageInput").value

            axios.post("http://localhost:5000/products", {
                    category: category,
                    name: name,
                    currency: currency,
                    quantity: quantity,
                    deliveryPrice: deliveryPrice,
                    takeAwayPrice: takeAwayPrice,
                    description: description,
                    image: image
            })
        }

    return(<div className="addProduct">
                <form enctype="multipart/form-data" action="/#/add-product" method="post">
                    <h1 id="formTitle" className="formComponents" >Add Products</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents" />
                    <label id="nameLabel" className="formComponents" >Product Name</label>
                    <input id="nameInput" className="formComponents"  placeholder="Margarita"/>
                    <label id="currencyLabel"  className="formComponents" >Currency</label>
                    <select id="currencySelect" name="currency" className="formComponents" >
                        <option value="usd">USD</option>
                        <option value="euro">EUR</option>                                       
                    </select>
                    <label id="quantityLabel" className="formComponents" >Quantity</label>
                    <input placeholder="01" id="quantityInput" className="formComponents"  />
                    <label id="deliveryLabel"  className="formComponents" >Delivery Price</label>
                    <input placeholder="$10" id="deliveryInput"  className="formComponents" />
                    <label id="takeAwayLabel" className="formComponents" >Take away Price</label>
                    <input placeholder="$10" id="takeAwayInput" className="formComponents" />
                    <label id="descriptionLabel" className="formComponents" >Description</label>
                    <textarea id="descriptionInput" placeholder="Description" className="formComponents" />
                    <label id="imageLabel" className="formComponents" >Product Image</label>
                    <input type="file" name="image" id="imageInput"  className="formComponents" ></input>
                    <button type="submit" id="submit" className="formComponents" onClick={ addProduct }>add product</button>
                </form>
           </div>)
}