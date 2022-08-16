import "../css/preview.css"
import axios from "axios"
import { useEffect, useState } from "react"

//The component where we can check and modify the menu.
export const Preview = () => {
    
    //----------------------STATE NEEDED------------------------------------------------------>

    const [ products, setProducts ] = useState([])
    const [ name, setName ] = useState("")
    const [ deliveryPrice, setDeliveryPrice ] = useState("")
    const [ takeAwayPrice, setTakeAwayPrice ] = useState("")
    const [ currency, setCurrency ] = useState("USD")
    const [ description, setDescription ] = useState("")

    //----------------------------------------------------------------------------------------->
    
    //----------------------------FUNCTIONS NEEDED--------------------------------------------->

    //-------> Saving all products from database to state <------
    useEffect(() => {

        axios.get("http://localhost:5000/products").
        then((res) => {

                setProducts(res.data)
               }
             )            
           } , [setProducts]
        )
    
    //-------> The function to edit each individual products <------    
    const editProducts = (index) => {

          let edit = document.getElementsByClassName("edit" + index)
          let editButton = document.getElementsByClassName("editButton" + index)
          let characteristics = document.getElementsByClassName("characteristics" + index)
          
          //Setting the characteristics state for the case the user doesnt modify all the fields.
          setName(characteristics[1].innerHTML)
          setDeliveryPrice(characteristics[2].innerHTML)
          setTakeAwayPrice(characteristics[3].innerHTML)
          setDescription(characteristics[5].innerHTML)
          
          //Setting first input field display none from the start, so that the function works on first click.
          if(edit[0].style.display === "") {
            edit[0].style.display = "none"
          }


          //Hiding the saved characteristics and show only input fields
          if(edit[0].style.display === "none") {

                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "initial"
                    editButton[0].innerHTML = "Confirm"
                    characteristics[i].style.display = "none"
                  }
                  characteristics[5].style.display = "none"
          } 
          //Not allowing empty fields and very large prices numbers
          else {
            
                  for( let i=0; i < edit.length; i++) {
                    edit[i].style.display = "none"
                    editButton[0].innerHTML = "Edit"
                    characteristics[i].style.display = "initial"              
                  }
                  characteristics[5].style.display = "initial"
                
                if((name === "" || description === "" || 
                   deliveryPrice === "" || takeAwayPrice === "")
                   && deliveryPrice.length <= 3 
                   && takeAwayPrice.length <= 3 ){
                    console.log(name, deliveryPrice, takeAwayPrice, currency, description) 
                  alert("No empty fields allowed!")
                } 
                else if (deliveryPrice.length > 3 || takeAwayPrice.length > 3) {

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
                                                                    deliveryPrice: deliveryPrice,
                                                                    takeAwayPrice: takeAwayPrice,
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
            <div id="productsWrapper">
            {products.map((item, index) => <div className="products">
                                              <img src={ item.Image_name} className= {"image productImage" + index} /> 
                                              <input type="file" className= {"updateImage" + index}
                                                     name="newImage" onChange = { (event) => updateImage(event, index) } />
                                              <p className={"characteristics" + index}>{ item.ID }</p>                                       
                                              <p>{item.Category}</p>
                                              <p className={"characteristics" + index} >{item.Name}</p><input defaultValue={item.Name} 
                                                                                                              className={"edit edit" + index }
                                                                                                              onChange = {(e) => {(e.target.value !== "") ? 
                                                                                                                                setName(e.target.value) : 
                                                                                                                                setName(item.Name)}
                                                                                                                          } /> 
                                              <p className={"characteristics" + index} >{item.Delivery_price}</p><input defaultValue={item.Delivery_price} 
                                                                                                                        className={"edit edit" + index } 
                                                                                                                        onChange = {(e) => { setDeliveryPrice(e.target.value) }} />
                                              <p className={"characteristics" + index} >{item.Take_away_price}</p><input defaultValue={item.Take_away_price} 
                                                                                                                         className={"edit edit" + index }  
                                                                                                                         onChange = {(e) => setTakeAwayPrice(e.target.value)} />
                                              <p className={"characteristics" + index} >{item.Currency}</p><select className={"edit edit" + index } 
                                                                                                                    onChange = {(e) => setCurrency(e.target.value)} >
                                                                                                              <option value={item.Currency}>{item.Currency}</option>
                                                                                                              <option value={ item.Currency === "EUR"? "USD" : "EUR"}>{ item.Currency === "EUR"? "USD" : "EUR"}</option>
                                                                                                           </select>
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