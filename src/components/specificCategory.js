import "../css/specificCategory.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { filterName } from "../functions/preview"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCamera} from "@fortawesome/free-solid-svg-icons"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { hideNotifications } from "../functions/navBar"
import { LoadingSpinner } from "../components/loadingSpinner"
import { hideLoadingSpinner } from "../functions/general";
import { serverHost } from "../variables/variables"

//The component where we can check and modify the menu.
export const SpecificCategory = () => {
    
    //State needed
    const [ products, setProducts ] = useState([])
    const [categories, setCategories] = useState([])
    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ description, setDescription ] = useState("")

    const params = useParams()
    
    //----------------------------FUNCTIONS NEEDED--------------------------------------------->

    //-------> Saving all products from database to state <------
    useEffect(() => {

          axios.get( serverHost + "products/by-category/" + params.category ).
          then((res) => {
                  hideLoadingSpinner("loadingCategory")
                  setProducts(res.data)
                }
              )            
            
          axios.get( serverHost + "products/categories" ).then((res) => {

              setCategories(res.data)
          }) 
        } , [setProducts, setCategories])
    
    //-------> The function to edit each individual products <------    
    const editProducts = (index) => {

          let edit = document.getElementsByClassName("edit" + index)
          let editButton = document.getElementsByClassName("editButton" + index)
          let characteristics = document.getElementsByClassName("characteristics" + index)
          
          //Setting the characteristics state for the case the user doesnt modify all the fields.
          setName(characteristics[1].innerHTML)
          setPrice(characteristics[2].innerHTML)
          setDescription(characteristics[4].innerHTML)
          
          //Setting first input field display none from the start, so that the function works on first click.
          if(edit[0].style.display === "") {
            edit[0].style.display = "none"
          }

          //Hiding the saved characteristics and show only input fields
          if(edit[0].style.display === "none") {

                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "initial"
                    editButton[0].innerHTML = "Confirm"
                    if(i !== 0)characteristics[i].style.display = "none"
                  }
                  characteristics[4].style.display = "none"
          } 
          //Not allowing empty fields and very large prices numbers
          else {            
                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "none"
                    editButton[0].innerHTML = "Info saved!"
                    characteristics[i].style.display = "initial"              
                  }
                  characteristics[4].style.display = "initial"
                
                if((name === "" || description === "" || price === "")
                   && price.length <= 3){                    
                  alert("No empty fields allowed!")
                } 
                else if (price.length > 3) {

                  alert("This is a restaurant, not a jewellery shop. You are too expensive!!")
                }  
                //Update the data and refresh the page.
                else {

                      let id =  characteristics[0].innerHTML
                      let date = new Date()
                      date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
                             "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

                      axios.put( serverHost + "products/update-characteristics/" + id,
                                                                 {  date: date,
                                                                    name: name,
                                                                    price: price,
                                                                    currency: "EUR",
                                                                    description: description }
                                                                )   
                            .then( res => window.location.reload() )                               
                            .catch( err => console.log(err)) 
                      
                      
                    }   
                }
            }
    
    //-------> The function to change a product image  <------      
    const updateImage = (event, index) => { 
                
                let type = /\.(jpe?g|tiff?|png|webp|bmp|avif)$/i
                let name = event.target.files[0].name
                let size = event.target.files[0].size
                let input = document.getElementsByClassName("updateImage" + index)[0]
                let characteristics = document.getElementsByClassName("characteristics" + index)
                let id = characteristics[0].innerHTML

                let newImage = new FormData()                      
                
                
                //Allowing only images of specific size
                if( type.test(name) === true && size <= 500000) {
                     

                    let newName = Date.now() + "-" + event.target.files[0].name
                    let date = new Date()
                    date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
                             "_" + date.getHours() + ":" + date.getMinutes() 

                    newImage.append("newImage", event.target.files[0], newName )     
                    
                    axios.post( serverHost + "products/update-image/" + id, newImage)
                         .then( res => window.location.reload() ) 
                         .catch( err => console.log(err)) 
                   
                }  else if( type.test(name) === false ){

                    alert("This is not an image!!")
                    input.value = ""
                } else if( size > 500000 ){

                    alert("The image size is too big")
                    input.value = ""
                }       

    }
    
    //-------> The function to delete products <-------
    const deleteProducts = (index) => {

        let id = products[index].ID

        axios.delete( serverHost + "products/delete-product/" + id)
             .then( res => window.location.reload() ) 
    }
 
  //----------------------------------------------------------------------------------------->
  
  return(<div className="preview" onClick={ hideNotifications }>
            <div className="productsHeader">
              <p id="productsTitle"> Dish types / {params.category}</p>
              <div id="searchWrapper">
                <input id="searchBar" type="text" placeholder="product's name" />
                <button id="searchButton" onClick={ filterName }>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div id="loadingCategory">
              <LoadingSpinner />
            </div>
            <div id="productsWrapper">              
              {products.map((item, index) => 
                              <div className={ "product product" + index }>
                                  <img src={ item.Image_name} className= {"image productImage" + index} /> 
                                  <label id="changeImageWrapper">
                                    <button id="changeImage" >
                                      <FontAwesomeIcon icon={faCamera} />
                                    </button> 
                                    <input type="file" className= {"updateImage" + index} id="changeImageInput"
                                           name="newImage" onChange = { (event) => updateImage(event, index) } />
                                  </label>                             
                                  <p className="productInfo"><b>Product ID: </b><span className={"characteristics" + index}>{ item.ID }</span></p>                                       
                                  <p className="productInfo"><b>Category: </b><span className={"category" + index}>{item.Category}</span></p>
                                  <p className="productInfo"><b>Name: </b><span className={"productName characteristics" + index} >{item.Name}</span>
                                            <input defaultValue={item.Name} 
                                                   maxLength={ 35 }  
                                                   className={"edit edit" + index }
                                                   onChange = {(e) => {(e.target.value !== "") ? 
                                                                       setName(e.target.value) : 
                                                                        setName(item.Name)}  } /> 
                                  </p>
                                  <p className="productInfo"><b>Price: </b><span className={"characteristics" + index} >{item.Price}</span>
                                            <input defaultValue={item.Price} 
                                                      className={"edit edit" + index } 
                                                      onChange = {(e) => { setPrice(e.target.value) }} />
                                  </p>
                                  <p className="productInfo"><b> Currency: </b> 
                                    <span className={"characteristics" + index} >{item.Currency}</span>                                    
                                  </p>
                                  <p className="productInfo"><b>Description: </b>
                                  <span className={"productInfo characteristics" + index} >{item.Description}</span>
                                  </p>
                                  <textarea defaultValue= {item.Description} 
                                                    rows='1'
                                              className= {"edit description edit" + index } 
                                              onChange = {(e) => setDescription(e.target.value)} />                          
                                  <p className="productInfo"><b>Last date modified:</b> {item.Date} </p>
                                  <div className="buttonFlexbox">
                                    <button onClick={ () => editProducts(index) } className={"editButton editButton" + index}>
                                      <FontAwesomeIcon icon={faPencil} /> Edit 
                                    </button>
                                    <button onClick={ () => deleteProducts(index) } className={"deleteButton deleteButton" + index}>
                                      <FontAwesomeIcon icon={faTrash} /> Delete 
                                    </button>
                                  </div>
                              </div>)}                                              
            </div>
         </div>)
}