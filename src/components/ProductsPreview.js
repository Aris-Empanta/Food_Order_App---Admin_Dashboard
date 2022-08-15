import "../css/preview.css"
import axios from "axios"
import { useEffect, useState } from "react"

//The component where we can check and modify the menu.
export const Preview = () => {

    const [ products, setProducts ] = useState([])
    const [ name, setName ] = useState("")
    const [ deliveryPrice, setDeliveryPrice ] = useState(0)
    const [ takeAwayPrice, setTakeAwayPrice ] = useState(0)
    const [ currency, setCurrency ] = useState("USD")
    const [ description, setDescription ] = useState("")

    //Saving all products from database
    useEffect(() => {

        axios.get("http://localhost:5000/products").
        then((res) => {

                setProducts(res.data)
               }
             )
            
           } , [setProducts]
        )
    
    //The function to edit each individual products    
    const editProducts = (index) => {

          let edit = document.getElementsByClassName("edit" + index)
          let editButton = document.getElementsByClassName("editButton" + index)
          let characteristics = document.getElementsByClassName("characteristics" + index)
   
          
          if(edit[0].style.display === "") {
            edit[0].style.display = "none"
          }
          console.log(characteristics[5])

          if(edit[0].style.display === "none") {

                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "initial"
                    editButton[0].innerHTML = "Confirm"
                    characteristics[i].style.display = "none"
                  }
                  characteristics[5].style.display = "none"
          } else {
            
                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "none"
                    editButton[0].innerHTML = "Edit"
                    characteristics[i].style.display = "initial"              
                  }
                  characteristics[5].style.display = "initial"
                  
                  axios.put("http://localhost:5000/products", { id: characteristics[0].innerHTML ,
                                                                name: name,
                                                                deliveryPrice: deliveryPrice,
                                                                takeAwayPrice: takeAwayPrice,
                                                                currency: currency,
                                                                description: description   
                                                              })   
                  window.location.reload()      
          }
    }

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
                    console.log(newName)

                    newImage.append("newImage", event.target.files[0], newName )     
                    
                    axios.post("http://localhost:5000/products/" + id, newImage )
                    window.location.reload()
                }  else if( type.test(name) === false ){

                    alert("This is not an image!!")
                    input.value = ""
                } else if( size > 500000 ){

                    alert("The image size is too big")
                    input.value = ""
                }              

    }

    return(<div className="preview">
            <div id="productsWrapper">
            {products.map((item, index) => <div className="products">
                                              <img src={ item.Image_name} className= {"image productImage" + index} /> 
                                              <input type="file" className= {"updateImage" + index}
                                                     name="newImage" onChange = { (event) => updateImage(event, index) } />
                                              <p className={"characteristics" + index}>{ item.ID }</p>                                       
                                              <p>{item.Category}</p>
                                              <p className={"characteristics" + index} >{item.Name}</p><input className={"area edit" + index }
                                                                                                              onChange = {(e) => setName(e.target.value)} /> 
                                              <p className={"characteristics" + index} >{item.Delivery_price}</p><input className={"area edit" + index } 
                                                                                                                        onChange = {(e) => setDeliveryPrice(e.target.value)} />
                                              <p className={"characteristics" + index} >{item.Take_away_price}</p><input className={"area edit" + index }  
                                                                                                                          onChange = {(e) => setTakeAwayPrice(e.target.value)} />
                                              <p className={"characteristics" + index} >{item.Currency}</p><select className={"area edit" + index } 
                                                                                                                    onChange = {(e) => setCurrency(e.target.value)} >
                                                                                                              <option value={item.Currency}>{item.Currency}</option>
                                                                                                              <option value={ item.Currency === "EUR"? "USD" : "EUR"}>{ item.Currency === "EUR"? "USD" : "EUR"}</option>
                                                                                                           </select>
                                              <p className={"characteristics" + index} >{item.Description}</p><textarea className={"area edit" + index } 
                                                                                                                        onChange = {(e) => setDescription(e.target.value)} />
                                              <button onClick={ () => editProducts(index) } className={"editButton" + index}>Edit </button>
                                          </div>)}
            </div>
           </div>)
}