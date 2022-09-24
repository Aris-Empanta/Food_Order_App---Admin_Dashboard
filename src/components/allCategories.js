import axios from "axios"
import { useEffect, useState } from "react"
import "../css/allCategories.css"

export const AllCategories = () => {

    const [ categories, setCategories ] = useState([])

    useEffect(() => {

        axios.get("http://localhost:5000/products/categories-with-image")
             .then( res => setCategories(res.data))
    }, [])


    return (<div className="allCategories">
                { categories.map( item => <div>
                                            <p>{ item.category }</p>
                                            < img className="categoryImage" src={ item.image } />
                                            <a href={ "#/all-categories/" + item.category } target="_blank"><button>Check all</button></a>
                                        </div>) }
            </div>)
}