import axios from 'axios'
import { useEffect, useState } from "react";

export const Customers = () => {

    useEffect(() => {

        axios.get('http://localhost:5000/customers/customers-info')
             .then( res => console.log(res.data))
    })

    return(<div></div>)
}
