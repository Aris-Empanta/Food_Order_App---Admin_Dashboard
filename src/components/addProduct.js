import "../css/addProduct.css"
import axios from "axios"
import { useState } from  'react'


export const AddProduct = () => {

    const [ selectedImage, setSelectedImage ] = useState(null)
    const [ dataArray, setDataArray] = useState([])    
    const [ category, setCategory] = useState("")
    const [ name, setName] = useState("")
    const [ currency, setCurrency] = useState("USD")
    const [ quantity, setQuantity] = useState("")
    const [ deliveryPrice, setDeliveryPrice] = useState("")
    const [ takeAwayPrice, setTakeAwayPrice] = useState("")
    const [ description, setDescription] = useState("")
    const [ stringData, setStringData] = useState({})

    const handleImage = (event) => {
                            setSelectedImage(event.target.files[0])                            
                        }   
    
    //The function to send form data to the server.
    const addProduct = (event) => {

                     event.preventDefault()
             
                     let imageData = new FormData()
                     if(selectedImage !== null) {
                            imageData.append("image", selectedImage, selectedImage.name)
                        }
                                                
                    //Not allowing empty fields
                    if( Object.values(stringData).includes("") || Object.values(stringData).length === 0
                        || selectedImage === null ){
                            alert("There are empty fields!")
                    } else {                            
                            axios.post("http://localhost:5000/products", imageData)
                            axios.post("http://localhost:5000/products", stringData)
                            alert("product added successfully!")
                        }
                        
                    }

      

    return(<div className="addProduct">
                <form >
                    <h1 id="formTitle" className="formComponents" >Add Products</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents" onChange={ (e) => { let category = e.target.value
                                                                                                                 setCategory(category)                                
                                                                                                                 setStringData({...stringData, category: category})                                
                                                                                                                }}/>
                    <label id="nameLabel" className="formComponents">Product Name</label>
                    <input id="nameInput" className="formComponents"  placeholder="Margarita" onChange={ (e) => { let name = e.target.value
                                                                                                                 setCategory(name)                                
                                                                                                                 setStringData({...stringData, name: name})                                
                                                                                                                }}/>
                    <label id="currencyLabel"  className="formComponents" >Currency</label>
                    <select id="currencySelect" name="currency" className="formComponents" onChange={ (e) => { let currency = e.target.value
                                                                                                                 setCurrency(name)                                
                                                                                                                 setStringData({...stringData, currency: currency})                                
                                                                                                                } }>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>                                       
                    </select>
                    <label id="quantityLabel" className="formComponents" >Quantity</label>
                    <input placeholder="01" id="quantityInput" className="formComponents" onChange={(e) => { let quantity = e.target.value
                                                                                                                 setCategory(quantity)                                
                                                                                                                 setStringData({...stringData, quantity: quantity})                                
                                                                                                            }}/>
                    <label id="deliveryLabel"  className="formComponents" >Delivery Price</label>
                    <input placeholder="$10" id="deliveryInput"  className="formComponents" onChange={(e) => { let deliveryPrice = e.target.value
                                                                                                                 setCategory(deliveryPrice)                                
                                                                                                                 setStringData({...stringData, deliveryPrice: deliveryPrice})                                
                                                                                                                }}/>
                    <label id="takeAwayLabel" className="formComponents" >Take away Price</label>
                    <input placeholder="$10" id="takeAwayInput" className="formComponents" onChange={(e) => { let takeAwayPrice = e.target.value
                                                                                                                 setCategory(takeAwayPrice)                                
                                                                                                                 setStringData({...stringData, takeAwayPrice: takeAwayPrice})                                
                                                                                                                }}/>
                    <label id="descriptionLabel" className="formComponents" >Description</label>
                    <textarea id="descriptionInput" placeholder="Description" className="formComponents" onChange={(e) => { let description = e.target.value
                                                                                                                            setCategory(description)                                
                                                                                                                            setStringData({...stringData, description: description})                                
                                                                                                                            }}/>
                    <label id="imageLabel" className="formComponents" >Product Image</label>
                    <input type="file" name="image" id="imageInput"  className="formComponents" onChange={ handleImage }></input>
                    <button id="submit" className="formComponents" onClick={ addProduct }>add product</button>
                </form>
           </div>)
}