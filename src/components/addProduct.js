import "../css/addProduct.css"
import axios from "axios"
import { useEffect, useState } from  'react'

//The component where we add new products to the restaurant menu.
export const AddProduct = () => {

    //State needed
    const [ selectedImage, setSelectedImage ] = useState(null)  
    const [ category, setCategory] = useState("")
    const [id, setId] = useState("")
    const [allIds, setAllIds] = useState([])
    const [ name, setName] = useState("")
    const [ price, setPrice] = useState("") 
    const [ description, setDescription] = useState("")
    const [ imageName, setImageName] = useState("")
    const [ stringData, setStringData] = useState({})

    //----------------------FUNCTIONS NEEDED------------------------------------------------------>

    //-------> Setting the initial currency default value. <------
    useEffect(() => {
        
        //Saving all product Ids, to avoid duplicates later.
        axios.get("http://localhost:5000/products").then((res) => {

            let ids = []
            for(let data of res.data) {
                ids.push(data.ID)
            }
            setAllIds(ids)
            
        })
        
    }, [setAllIds])
    
    //------> Capturing the uploaded image in the state. <------
    const handleImage = (event) => {

                                    let type = /\.(jpe?g|tiff?|png|webp|bmp|avif)$/i
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
                    if( data.includes("") || data.length < 5 || selectedImage === null ){                           
                            
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
                    else if(stringData.price.length > 3) {

                        alert("This is a restaurant, not a jewelleryshop! You are too expensive")

                        for(let i=0; i<formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }  
                         
                        if (stringData.price.length > 3){
                            formComponents[4].style.border = "1px solid red" 
                        }
                    }                  
                    else {    

                        let formComponents = document.getElementsByClassName("inputs")
                            
                        for(let i=0; i < formComponents.length; i++){
                            
                            formComponents[i].style.border = "1px solid black"                            
                        }                        
                            axios.post("http://localhost:5000/products/add/" + stringData.id, imageData)                            
                            axios.post("http://localhost:5000/products/add/" + stringData.id, stringData)
                            
                            setTimeout(() => alert("product added successfully!"), 10)
                            setTimeout(() => window.location.reload(), 500)                         
                        }          
                        
                    }      
    //---------------------------------------------------------------------------------------------------->

    return(<div className="addProduct components" >
                <form encType= "multipart/form-data" >
                    <h1 id="formTitle" className="formComponents" >ADD PRODUCT FORM</h1>
                    <hr id="formLine"></hr>                    
                    <label id="categoryLabel" className="formComponents" >Product Category</label>
                    <input placeholder="Pizza" id="categoryInput" className="formComponents inputs" 
                           type="text" onChange={ (e) => { let category = e.target.value
                                                           setCategory(category)                                
                                                           setStringData({...stringData, category: category}) }}/>
                    <label id="productLabel" className="formComponents">Product ID</label>
                    <input id="productId" className="formComponents inputs"  placeholder="ID" 
                           type='number' onChange={ (e) => { let id = e.target.value
                                                             setId(id)                                
                                                             setStringData({...stringData, id: id}) }}/>
                    <label id="nameLabel" className="formComponents">Product Name</label>
                    <input id="nameInput" className="formComponents inputs"  
                           placeholder="Margarita" maxLength={ 35 } 
                           type="text" onChange={ (e) => { let name = e.target.value
                                                           setName(name)                                
                                                           setStringData({...stringData, name: name}) }}/>    
                    <label id="priceLabel"  className="formComponents" >Price</label>
                    <input placeholder="10" id="priceInput"  className="formComponents inputs" 
                           type="number" onChange={(e) => { let price = e.target.value
                                                            setPrice(price)                                
                                                            setStringData({...stringData, price: price}) }}/>
                    <label id="descriptionLabel" className="formComponents" >Description</label>
                    <textarea id="descriptionInput"  rows="8" placeholder="Description" className="formComponents inputs" 
                              type="text" onChange={(e) => { let description = e.target.value
                                                             setDescription(description)                                
                                                             setStringData({...stringData, description: description}) }}/>
                    <label id="imageLabel" className="formComponents" >Product Image</label>    
                    <label id="uploadWrapper">
                        <button id="uploadImage" >Select image</button>   
                        <input type="file"   name="image" id="imageInput" className="formComponents inputs" 
                               onChange={ handleImage } />                                                                                                                           
                    </label>
                    <div id="submitWrapper">
                        <button id="submit" className="formComponents" onClick={ addProduct }>ADD PRODUCT</button>
                    </div>                
                </form>
           </div>)
}