import "../css/addProduct.css"
import axios from "axios"
import { useEffect, useState } from  'react'

//The component where we add new products to the restaurant menu.
export const AddProduct = () => {

    //----------------------STATE NEEDED------------------------------------------------------>

    const [ selectedImage, setSelectedImage ] = useState(null)  
    const [ category, setCategory] = useState("")
    const [id, setId] = useState("")
    const [allIds, setAllIds] = useState([])
    const [ name, setName] = useState("")
    const [ currency, setCurrency] = useState("USD")
    const [ quantity, setQuantity] = useState("")
    const [ deliveryPrice, setDeliveryPrice] = useState("")
    const [ takeAwayPrice, setTakeAwayPrice] = useState("")
    const [ description, setDescription] = useState("")
    const [ imageName, setImageName] = useState("")
    const [ stringData, setStringData] = useState({})

    //-------------------------------------------------------------------------------------->

    //----------------------FUNCTIONS NEEDED------------------------------------------------------>

    //-------> Setting the initial currency default value. <------
    useEffect(() => {
        
        let data = Object.values(stringData)

        if(data.length === 0){
            setStringData({currency: currency})
        }

        //Saving all product Ids, to avoid duplicates later.
        axios.get("http://localhost:5000/products").then((res) => {

            let ids = []
            for(data of res.data) {
                ids.push(data.ID)
            }
            setAllIds(ids)
            
        })
        
    }, [setAllIds])
    
    //------> Capturing the uploaded image in the state. <------
    const handleImage = (event) => {

                                    let type = /\.(jpe?g|tiff?|png|webp|bmp)$/i
                                    let name = event.target.files[0].name
                                    let size = event.target.files[0].size
                                    let input = document.getElementById("imageInput")
                                    
                                    //Allowing only images of specific size
                                    if( type.test(event.target.files[0].name) === true ) {
                                        
                                        setSelectedImage(event.target.files[0])                                        
                                    }  else if( type.test(name) === false ){

                                        alert("This is not an image!!")
                                        input.value = ""
                                    } else if( size > 500000 ){

                                        alert("The image size is too big")
                                        input.value = ""
                                    }

                                    
                                    /*Saving the image in the object state that we will sent to the backend, 
                                     with the date in front, in case 2 users put an image with same name.*/
                                    let imageName =  Date.now() + "-" + name
                                    setStringData({...stringData, imageName: imageName}) 
                                    
                                   
                                }   

    
    //------> The function to send product data to the server. <------
    const addProduct = (event) => {

                     event.preventDefault()
                                         
                     //Using the FormData object to save the uploaded image to be sent to the server.
                     let imageData = new FormData()

                     
                     if(selectedImage !== null ) {                            
                            imageData.append("image", selectedImage, stringData.imageName) 
                        }
                    
                    /*The stingData object state, contains all the values of the input fields.
                      we convert it to an array for the use needed below.*/
                    let data = Object.values(stringData)
                    let formComponents = document.getElementsByClassName("inputs")
                             
                    //Not allowing empty fields or duplicate IDs.
                    if( data.includes("") || data.length < 7 || selectedImage === null ){                           
                            
                            for(let i=0; i<formComponents.length; i++){
                                if(formComponents[i].value === "" ) {
                                    formComponents[i].style.border = "1px solid red"
                                } else {
                                    formComponents[i].style.border = "1px solid black"
                                }
                            }
                            setTimeout(() => alert("There are empty fields!"), 10)                      
                    } else if (allIds.includes(parseInt(stringData.id))) {
                                
                                for(let i=0; i<formComponents.length; i++){
                                    
                                    formComponents[i].style.border = "1px solid black"                            
                                }  
                                formComponents[1].style.border = "1px solid red"
                                setTimeout(() => alert("Product id already exists!"), 10)
                    }
                    //Not allowing very high prices. 
                    else if(stringData.deliveryPrice.length > 3 || stringData.takeAwayPrice.length > 3) {

                        alert("This is a restaurant, not a jewelleryshop! You are too expensive")

                        for(let i=0; i<formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }  
                         
                        if (stringData.deliveryPrice.length > 3){
                            formComponents[4].style.border = "1px solid red" 
                        }
                        if(stringData.takeAwayPrice.length > 3){
                             formComponents[5].style.border = "1px solid red" 
                            }

                    }
                    //Also quantity should have a limit.
                    else if(stringData.quantity.length > 4) {

                        for(let i=0; i<formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }  
                        alert("So many products? How many people you want to feed an entire army?")
                        formComponents[3].style.border = "1px solid red"
                    }
                    else {    

                        let formComponents = document.getElementsByClassName("inputs")
                            
                        for(let i=0; i<formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }                        
                            axios.post("http://localhost:5000/products/add/" + stringData.id, imageData)                            
                            axios.post("http://localhost:5000/products/add/" + stringData.id, stringData)
                            
                            setTimeout(() => alert("product added successfully!"), 10)
                            setTimeout(() => window.location.reload(), 500)                         
                        }          
                        
                    }      
    //---------------------------------------------------------------------------------------------------->

    return(<div className="addProduct">
                <form encType= "multipart/form-data" >
                    <h1 id="formTitle" className="formComponents" >Add Products</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents inputs" onChange={ (e) => { let category = e.target.value
                                                                                                                 setCategory(category)                                
                                                                                                                 setStringData({...stringData, category: category})                                
                                                                                                                }}/>
                    <label id="productId" className="formComponents">Product ID</label>
                    <input id="productId" className="formComponents inputs"  placeholder="ID" onChange={ (e) => { let id = e.target.value
                                                                                                                 setId(id)                                
                                                                                                                 setStringData({...stringData, id: id})                                
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
                    <input type="file"   name="image" id="imageInput"  className="formComponents inputs" onChange={ handleImage }></input>
                    <button id="submit" className="formComponents" onClick={ addProduct }>add product</button>
                </form>
           </div>)
}