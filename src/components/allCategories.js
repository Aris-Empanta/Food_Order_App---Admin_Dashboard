import axios from "axios"
import { useEffect, useState } from "react"
import "../css/allCategories.css"
import { useNavigate } from "react-router-dom";
import { hideNotifications } from "../functions/navBar"
import { hideLoadingSpinner } from "../functions/general";
import { LoadingSpinner } from "./loadingSpinner";

export const AllCategories = () => {

    const [ categories, setCategories ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        axios.get("https://restaurant-server.arisdb.myipservers.gr/products/categories-with-image")
             .then( res => {
                            hideLoadingSpinner("loadingCategories")
                            setCategories(res.data)
                          })
    }, [])

    const checkDishes = (category) => {

        navigate("./" + category, { replace: false} )
    }
 

    return (<div onClick={ hideNotifications }>
              <div id="typesTitle"> 
                <h1>Dish types</h1>
              </div>
              <div id="loadingCategories">
                <LoadingSpinner />
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