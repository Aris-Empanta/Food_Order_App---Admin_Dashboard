import axios from 'axios'
import { useEffect, useState } from "react";
import "../css/customers.css"
import { hideNotifications } from "../functions/navBar"

export const Customers = () => {

    const [customerData, setCustomerData] = useState([])

    useEffect(() => {

        axios.get('http://localhost:5000/customers/customers-info')
             .then( res => setCustomerData(res.data))
    })

    return(<div className='customersComponent' onClick={ hideNotifications }>
             <div className='customersWrapper'>
                <h1 className='customersTitle'>Customer List</h1>
                <table className="customersTable" cellspacing="0">
                  <tr>                    
                    <th>Customer's name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Floor</th>
                    <th>Date registered</th>
                  </tr>
                  {customerData.map(item => <tr>
                                                <td>{ item.Name }</td>
                                                <td>{ item.Address }</td>
                                                <td>{ item.Phone }</td>
                                                <td>{ item.Email }</td>
                                                <td>{ item.Floor }</td>
                                                <td>{ item.dateRegistered }</td>
                                             </tr>
                                    )}
                </table>  
             </div>
           </div>)
}
