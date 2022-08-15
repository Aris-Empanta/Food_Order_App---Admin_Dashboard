import "../css/preview.css"
import axios from "axios"
import { useEffect, useState } from "react"

//The component where we can check and modify the menu.
export const Preview = () => {

    const [products, setProducts ] = useState([])
    const [alteredProducts, setAlteredProducts] = useState([])

    //Saving all products from database
    useEffect(() => {

        axios.get("http://localhost:5000/products").
        then((res) => {

                setProducts(res.data)
               }
             )
            
           } , [setProducts]
        )
    
    //The function to edit and delete each individual products    
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
                                                            name: edit[0].value,
                                                            deliveryPrice: edit[1].value,
                                                            takeAwayPrice: edit[2].value,
                                                            currency: edit[3].value,
                                                            description: edit[4].value   
                                                          })         
          }   
              
          
    }

    return(<div className="preview">
            <div id="productsWrapper">
            {products.map((item, index) => <div className="products">
                                              <img src={ item.Image_name} className="productImage" /> 
                                              <p className={"characteristics" + index}>{ item.ID }</p>                                       
                                              <p>{item.Category}</p>
                                              <p className={"characteristics" + index} >{item.Name}</p><input className={"area edit" + index } />
                                              <p className={"characteristics" + index} >{item.Delivery_price}</p><input className={"area edit" + index } />
                                              <p className={"characteristics" + index} >{item.Take_away_price}</p><input className={"area edit" + index }  />
                                              <p className={"characteristics" + index} >{item.Currency}</p><select className={"area edit" + index } >
                                                                                                              <option value={item.Currency}>{item.Currency}</option>
                                                                                                              <option value={ item.Currency === "EUR"? "USD" : "EUR"}>{ item.Currency === "EUR"? "USD" : "EUR"}</option>
                                                                                                           </select>
                                              <p className={"characteristics" + index} >{item.Description}</p><textarea className={"area edit" + index } />
                                              <button onClick={ () => editProducts(index) } className={"editButton" + index}>Edit </button>
                                          </div>)}
            </div>
           </div>)
}