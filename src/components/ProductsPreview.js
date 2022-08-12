import "../css/preview.css"
import axios from "axios"
import { useEffect, useState } from "react"

//The component where we can check and modify the menu.
export const Preview = () => {

    const [products, setProducts ] = useState([])
    

    useEffect(() => {

        axios.get("http://localhost:5000/products").
        then((res) => {           
                
                setProducts(res.data)                   

               }
             )
           } , [setProducts]
        )

    return(<div className="preview">
            <div id="productsWrapper">
            {products.map((item) => <div className="products">
                                        <img src={ item.Image_name} />                                        
                                        <p>{item.Category}</p>
                                        <p>{item.Name}</p>
                                        <p>{item.Delivery_price}</p>
                                        <p>{item.Take_away_price}</p>
                                        <p>{item.Currency}</p>
                                        <p>{item.Description}</p>
                                    </div>)}
            </div>
           </div>)
}