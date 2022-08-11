import "../css/addProduct.css"
import axios from "axios"
import { useEffect, useState } from  'react'

//The component where we add new products to the restaurant menu.
export const AddProduct = () => {

    const [ selectedImage, setSelectedImage ] = useState(null)  
    const [ category, setCategory] = useState("")
    const [ name, setName] = useState("")
    const [ currency, setCurrency] = useState("USD")
    const [ quantity, setQuantity] = useState("")
    const [ deliveryPrice, setDeliveryPrice] = useState("")
    const [ takeAwayPrice, setTakeAwayPrice] = useState("")
    const [ description, setDescription] = useState("")
    const [ stringData, setStringData] = useState({})

    //Adding to the object the initial currency value for the case we keep the default.
    useEffect(() => {
        
        let data = Object.values(stringData)

        if(data.length === 0){
            setStringData({currency: currency})
        }
    })
    
    //Capturing the uploaded image in the state.
    const handleImage = (event) => {
                            setSelectedImage(event.target.files[0])                            
                        }   
    
    //The function to send form data to the server.
    const addProduct = (event) => {

                     event.preventDefault()
                     
                     //Using the FormData object to prepare the uploaded image to be sent to the server.
                     let imageData = new FormData()
                     if(selectedImage !== null) {
                            imageData.append("image", selectedImage, selectedImage.name)
                        }
                    
                    /*The stingData object state, contaings all the values of the input fields.
                      we convert it to an array for the use needed below.*/
                    let data = Object.values(stringData)
                                                
                    //Not allowing empty fields
                    if( data.includes("") || data.length === 0 || selectedImage === null ){

                            let formComponents = document.getElementsByClassName("inputs")
                            
                            for(let i=0; i<formComponents.length; i++){
                                if(formComponents[i].value === "") {
                                    formComponents[i].style.border = "1px solid red"
                                } else {
                                    formComponents[i].style.border = "1px solid black"
                                }
                            }
                            setTimeout(() => alert("There are empty fields!"), 10)                      
                    } else {    

                        let formComponents = document.getElementsByClassName("inputs")
                            
                        for(let i=0; i<formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }                        
                            axios.post("http://localhost:5000/products", imageData)
                            axios.post("http://localhost:5000/products", stringData)
                            setTimeout(() => alert("product added successfully!"), 10)
                        }                        
                    }      

    return(<div className="addProduct">
                <form >
                    <h1 id="formTitle" className="formComponents" >Add Products</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents inputs" onChange={ (e) => { let category = e.target.value
                                                                                                                 setCategory(category)                                
                                                                                                                 setStringData({...stringData, category: category})                                
                                                                                                                }}/>
                    <label id="nameLabel" className="formComponents">Product Name</label>
                    <input id="nameInput" className="formComponents inputs"  placeholder="Margarita" onChange={ (e) => { let name = e.target.value
                                                                                                                 setName(name)                                
                                                                                                                 setStringData({...stringData, name: name})                                
                                                                                                                }}/>
                    <label id="currencyLabel"  className="formComponents" >Currency</label>
                    <select id="currencySelect" name="currency" className="formComponents" onChange={ (e) => { let currency = e.target.value
                                                                                                                 setCurrency(currency)                                
                                                                                                                 setStringData({...stringData, currency: currency})                                
                                                                                                                } }>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>                                       
                    </select>
                    <label id="quantityLabel" className="formComponents" >Quantity</label>
                    <input placeholder="01" id="quantityInput" className="formComponents inputs" onChange={(e) => { let quantity = e.target.value
                                                                                                                 setQuantity(quantity)                                
                                                                                                                 setStringData({...stringData, quantity: quantity})                                
                                                                                                            }}/>
                    <label id="deliveryLabel"  className="formComponents" >Delivery Price</label>
                    <input placeholder="$10" id="deliveryInput"  className="formComponents inputs" onChange={(e) => { let deliveryPrice = e.target.value
                                                                                                                 setDeliveryPrice(deliveryPrice)                                
                                                                                                                 setStringData({...stringData, deliveryPrice: deliveryPrice})                                
                                                                                                                }}/>
                    <label id="takeAwayLabel" className="formComponents" >Take away Price</label>
                    <input placeholder="$10" id="takeAwayInput" className="formComponents inputs" onChange={(e) => { let takeAwayPrice = e.target.value
                                                                                                                 setTakeAwayPrice(takeAwayPrice)                                
                                                                                                                 setStringData({...stringData, takeAwayPrice: takeAwayPrice})                                
                                                                                                                }}/>
                    <label id="descriptionLabel" className="formComponents" >Description</label>
                    <textarea id="descriptionInput" placeholder="Description" className="formComponents inputs" onChange={(e) => { let description = e.target.value
                                                                                                                            setDescription(description)                                
                                                                                                                            setStringData({...stringData, description: description})                                
                                                                                                                            }}/>
                    <label id="imageLabel" className="formComponents" >Product Image</label>
                    <input type="file" name="image" id="imageInput"  className="formComponents inputs" onChange={ handleImage }></input>
                    <button id="submit" className="formComponents" onClick={ addProduct }>add product</button>
                </form>
           </div>)
}