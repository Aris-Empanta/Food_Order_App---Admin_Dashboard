import "../css/frontDashboard.css"
import { hideNotifications } from "../functions/navBar"
import axios from "axios"
import { useEffect, useRef, useState} from  'react'
import useStateWithCallback from 'use-state-with-callback';
import { dailyTargetPercentage, progressCirclePercentage, 
         createChart, hideBeforeFetch, showAfterFetch } from "../functions/statistics";
import * as d3 from 'd3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { serverHost } from "../variables/variables";

export const FrontDashboard = () => {

    const chartRef = useRef()  

    const [ dailyIncome, setDailyIncome ] = useStateWithCallback("", () => progressCirclePercentage(dailyIncome))
    const [weeklyRevenues, setWeeklyRevenues ] = useStateWithCallback([], () => createChart(d3, weeklyRevenues, days, chartRef))
    const [days, setDays ] = useState([])
    const [totalOrders, setTotalOrders ] = useState("")  
    const [totalCustomers, setTotalCustomers ] = useState("")  
    const [totalRevenue, setTotalRevenue ] = useState("")
    const [ trendingOrders, setTrendingOrders] = useState([])

    useEffect(() => { 

        window.scrollTo(0,0)
        //The function to hide several elements prior fetching all
        //required data
        hideBeforeFetch()            

        const endpoints = [
                            serverHost + "statistics/daily-income",
                            serverHost + "statistics/weekly-income",
                            serverHost + "statistics/total-orders-amount",
                            serverHost + "statistics/total-customers-amount",
                            serverHost + "statistics/total-revenue",
                            serverHost + "statistics/trending-orders"
                        ]
        axios.all(endpoints.map( endpoint => axios.get(endpoint)))
            .then((response) => {   
                                    //The function to show the hidden data
                                    showAfterFetch()

                                    let dailyRevenues = response[1].data.map( item => parseInt(item.revenue)).reverse()

                                    let days = response[1].data.map( item => item.day.split('')
                                                                                      .splice(0, 3)
                                                                                      .join(''))
                                                                .reverse()
                                    
                                    setDailyIncome(response[0].data.dailyIncome)
                                    setWeeklyRevenues(dailyRevenues)
                                    setDays(days)
                                    setTotalOrders(response[2].data.ordersAmount)
                                    setTotalCustomers(response[3].data.customersAmount)
                                    setTotalRevenue(response[4].data.revenue)
                                    setTrendingOrders(response[5].data)
                                })   
            .catch( err => console.log(err))          
                 
    }, [setDailyIncome, setWeeklyRevenues, setDays, setTotalOrders, 
        setTotalCustomers, setTotalRevenue, setTrendingOrders])

    return(<div id="frontDashboard" onClick={ hideNotifications }>
              <div id="welcomeTitleWrapper">
                  <h1 id="welcomeTitle" className="toBeHidden">Welcome!</h1>
               </div>         
               <div id="statistics">               
                 <div id="dailyTargetIncome">
                    <p id="dailyTargetTitle" className="toBeHidden">Daily Target Income</p>                
                    { dailyIncome === "" ? <Skeleton width = { 260 } height={400} highlightColor="white"/> :  
                    <div id="targetWrapper"  className="toBeHidden">
                        <svg class="circleWrapper" width="300" height="300">
                            <circle cx="150" cy="150" r="90"  class="track"></circle>
                            <circle cx="150" cy="150" r="90"  id="progressCircle"></circle>   
                        </svg>    
                        <div  id="inner">
                            <p id="percentage">{dailyTargetPercentage(dailyIncome)}%</p>
                        </div>                        
                    </div>  }  
                    <div>
                        <p id="dailyIncome" className="toBeHidden">&euro;{dailyIncome}</p><br /> 
                        <p id="targetIncomeAmount"  className="toBeHidden">from &euro;500</p> 
                    </div>    
                 </div>
                 <div className="statisticsWrapper" id="orderTab">
                    <div className="ordersCustomers">
                        <div className="amountLabelWrapper">
                            {totalOrders === "" ? <Skeleton width={200} height = { 80 } 
                                                            highlightColor="white"/> : 
                                                            <p id="totalOrders">{ totalOrders }</p>}
                            <p id="ordersWord" >Orders</p>
                        </div> 
                        <div id="ordersIconWrapper" className="toBeHidden">
                            <FontAwesomeIcon icon={ faShoppingCart }/>
                        </div>
                    </div>
                    <div id="revenueChart">
                        <p id="chartTitle" className="toBeHidden">Weekly Revenue</p>
                        {weeklyRevenues.length === 0 ? <Skeleton width={260} height = {200} 
                                                        highlightColor="white"/> :
                                                        <div id="chartWrapper">
                                                            <svg ref={ chartRef} id="barChart"></svg>
                                                        </div>}
                    </div> 
                 </div>  
                 <div className="statisticsWrapper" id="customerTab">
                    <div className="ordersCustomers"> 
                        <div className="amountLabelWrapper">
                        {totalOrders === "" ? <Skeleton width={200} height = {80} 
                                                        highlightColor="white"/> : 
                                                        <p id="totalCustomers">{ totalCustomers }</p>}
                            <p id="customersWord">Customers</p>
                        </div> 
                        <div id="customersIconWrapper" className="toBeHidden">
                            <FontAwesomeIcon icon={ faUsers }/>
                        </div>
                    </div>
                    <div id="totalRevenue">
                        <p id="totalRevenueTitle" className="toBeHidden">Total Revenue</p>
                        { totalRevenue === "" ? <Skeleton width={200} height = {80} 
                                                          highlightColor="white"/> : 
                                                <p id="totalRevenueAmount">&euro;{ totalRevenue }</p> }
                        <div id="walletIcon" className="toBeHidden">
                            <FontAwesomeIcon icon={ faCoins }/>
                            <FontAwesomeIcon icon={ faMoneyBillWave }/>
                        </div>
                    </div> 
                 </div>                
               </div>
               <div id="trendingOrdersContainer" className="toBeHidden">
                    <h1 id="trendingOrdersTitle">Trending Orders</h1>
                    <hr id="horizontalLine"/>
                    <div id="trendingOrders">
                    { trendingOrders.map( (item, index) => <div className="trendingProduct">
                                                             <img className="trendingImage" src={ item.imageName } />
                                                             <p className="trendingProductName">{ item.productName }</p>
                                                             <p className="trendingProductPrice">&euro;{ item.unitPrice }</p>
                                                             <div className="rankAmountWrapper">
                                                               <p>Rank: <span className="rankOrdersValue">#{ index + 1}</span></p>
                                                               <p>Orders: <span className="rankOrdersValue">{ item.amount }</span></p>
                                                             </div>
                                                           </div>    
                                                         )}
                    </div>
               </div>
            </div>)
}