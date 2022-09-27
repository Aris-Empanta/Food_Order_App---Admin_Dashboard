import "../css/preview.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCamera} from "@fortawesome/free-solid-svg-icons"

//The component where we can check and modify the menu.
export const SpecificCategory = () => {
    
    //State needed
    const [ products, setProducts ] = useState([])
    const [categories, setCategories] = useState([])
    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ currency, setCurrency ] = useState("USD")
    const [ description, setDescription ] = useState("")

    const params = useParams()
    
    //----------------------------FUNCTIONS NEEDED--------------------------------------------->

    //-------> Saving all products from database to state <------
    useEffect(() => {

          axios.get("http://localhost:5000/products/by-category/" + params.category ).
          then((res) => {

                  setProducts(res.data)
                }
              )            
            
          axios.get("http://localhost:5000/products/categories").then((res) => {

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
                    editButton[0].innerHTML = "Edit"
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

                      axios.put("http://localhost:5000/products/update-characteristics/" + id,
                                                                 {  date: date,
                                                                    name: name,
                                                                    price: price,
                                                                    currency: currency,
                                                                    description: description }
                                                                )   
                      
                      window.location.reload()   
                    }   
                }
            }
    
    //-------> The function to change a product image  <------      
    const updateImage = (event, index) => {
                
                let type = /\.(jpe?g|tiff?|png|webp|bmp)$/i
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
                             "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

                    newImage.append("newImage", event.target.files[0], newName )     
                    
                    axios.post("http://localhost:5000/products/update-image/" + id, newImage)
                    window.location.reload()
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

        axios.delete("http://localhost:5000/products/delete-product/" + id)
        window.location.reload()
    }

  //----------------------------------------------------------------------------------------->
  
  return(<div className="preview">
             <div className="productsHeader">
               <p id="productsTitle"> Dish types / {params.category}</p>
               <div id="searchWrapper">
                <input id="searchBar" type="text" />
                <button id="searchButton"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
               </div>
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
                                <p>Product ID: <span className={"characteristics" + index}>{ item.ID }</span></p>                                       
                                <p> Category: <span className={"category" + index}>{item.Category}</span></p>
                                <p> Name: <span className={"characteristics" + index} >{item.Name}</span>
                                          <input defaultValue={item.Name} 
                                                className={"edit edit" + index }
                                                onChange = {(e) => {(e.target.value !== "") ? 
                                                                    setName(e.target.value) : 
                                                                    setName(item.Name)}  } /> 
                                </p>
                                <p>Price: <span className={"characteristics" + index} >{item.Price}</span>
                                          <input defaultValue={item.Price} 
                                                    className={"edit edit" + index } 
                                                    onChange = {(e) => { setPrice(e.target.value) }} />
                                </p>
                                <p> Currency: 
                                  <span className={"characteristics" + index} >{item.Currency}</span>
                                  <select className={"edit edit" + index } 
                                        onChange = {(e) => setCurrency(e.target.value)} >
                                        <option value={item.Currency}>{item.Currency}</option>
                                        <option value={ item.Currency === "EUR"? "USD" : "EUR"}>{ item.Currency === "EUR"? "USD" : "EUR"}</option>
                                  </select>
                                </p>
                                <p>Description: </p>
                                <p className={"characteristics" + index} >{item.Description}</p><textarea defaultValue={item.Description} 
                                                                                                          className={"edit edit" + index } 
                                                                                                          onChange = {(e) => setDescription(e.target.value)} />
                                <p>Last date modified: {item.Date} </p>
                                  <button onClick={ () => editProducts(index) } className={"editButton" + index}>Edit </button>
                                  <button onClick={ () => deleteProducts(index) } className={"deleteButton" + index}>Delete </button>
                              </div>)}                                              
            </div>
         </div>)
}