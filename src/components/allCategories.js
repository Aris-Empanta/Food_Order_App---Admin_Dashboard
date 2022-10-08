import axios from "axios"
import { useEffect, useState } from "react"
import "../css/allCategories.css"
import { useNavigate } from "react-router-dom";

export const AllCategories = () => {

    const [ categories, setCategories ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        axios.get("http://localhost:5000/products/categories-with-image")
             .then( res => setCategories(res.data))
    }, [])

    const checkDishes = (category) => {

        navigate("./" + category, { replace: false} )
    }
 

    return (<div>
              <div id="typesTitle">
                <h1>Dish types</h1>
              </div>
              <div className="allCategories">
                { categories.map( item => <div className="categoryWrapper">                                            
                                            < img className="categoryImage" src={ item.image } />
                                            <p className="categoryTitle">{ item.category }</p>
                                            <button onClick={() => checkDishes(item.category)} className="checkDishes">Check dishes</button>                                            
                                          </div>) }
              </div>
            </div>)
}