import axios from 'axios'
import { useEffect, useState } from "react";
import "../css/customers.css"
import { hideNotifications } from "../functions/navBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchCustomer } from '../functions/customers';
import { LoadingSpinner } from "../components/loadingSpinner"
import { hideLoadingSpinner } from "../functions/general";

export const Customers = () => {

    const [customerData, setCustomerData] = useState([])

    useEffect(() => {

        let customersTableWrapper = document.getElementById("customersTableWrapper")

        axios.get('http://localhost:5000/customers/customers-info')
             .then( res => {                             
                            hideLoadingSpinner("customersLoader")
                            customersTableWrapper.style.visibility = "visible"
                            setCustomerData(res.data) })
    })

    return(<div className='customersComponent' onClick={ hideNotifications }>
             <div className='customersWrapper'>
                <div id='customerListWrapper'>
                  <h1 className='customersTitle'>Customer List</h1>
                  <div id='customerSearchWrapper'>
                    <input type="text" id='desiredCustomer' placeholder="Customer's name"/>
                    <button id='customerSearchInput' onClick={ searchCustomer }>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </div>
                </div>    
                <div id='customersLoader'>
                  <LoadingSpinner />
                </div>            
                <div id='customersTableWrapper'> 
                  <table className="customersTable" cellSpacing="0">
                    <tr>                    
                      <th>Customer's name</th>
                      <th>Address</th> 
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Floor</th>
                      <th>Date registered</th>
                    </tr>
                    {customerData.map(item => <tr className='customersData'>
                                                  <td className='customerName'>{ item.Name }</td>
                                                  <td>{ item.Address }</td>
                                                  <td>{ item.Phone }</td>
                                                  <td>{ item.Email }</td>
                                                  <td>{ item.Floor }</td>
                                                  <td>{ item.dateRegistered }</td>
                                              </tr>
                                      )}
                  </table>  
                </div>
             </div>
           </div>)
}
