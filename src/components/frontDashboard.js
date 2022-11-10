import "../css/frontDashboard.css"
import { hideNotifications } from "../functions/navBar"
import axios from "axios"
import { useEffect, useRef, useState} from  'react'
import useStateWithCallback from 'use-state-with-callback';
import { dailyTargetPercentage, progressCirclePercentage, createChart } from "../functions/statistics";
import * as d3 from 'd3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export const FrontDashboard = () => {

    const chartRef = useRef()  

    const [ dailyIncome, setDailyIncome ] = useStateWithCallback(0, () => progressCirclePercentage(dailyIncome))
    const [weeklyRevenues, setWeeklyRevenues ] = useStateWithCallback([], () => createChart(d3, weeklyRevenues, days, chartRef))
    const [days, setDays ] = useState([])
    const [totalOrders, setTotalOrders ] = useState(0)  
    const [totalCustomers, setTotalCustomers ] = useState(0)  
    const [totalRevenue, setTotalRevenue ] = useState(0)
    const [ trendingOrders, setTrendingOrders] = useState([])

    useEffect(() => {

        const endpoints = [
                            "http://localhost:5000/statistics/daily-income",
                            "http://localhost:5000/statistics/weekly-income",
                            "http://localhost:5000/statistics/total-orders-amount",
                            "http://localhost:5000/statistics/total-customers-amount",
                            "http://localhost:5000/statistics/total-revenue",
                            "http://localhost:5000/statistics/trending-orders"
                        ]
        axios.all(endpoints.map( endpoint => axios.get(endpoint)))
            .then((response) => {   
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
                 
    }, [setDailyIncome, setWeeklyRevenues, setDays, setTotalOrders, 
        setTotalCustomers, setTotalRevenue, setTrendingOrders])

    return(<div id="frontDashboard" onClick={ hideNotifications }>
               <div id="welcomeTitleWrapper">
                  <h1 id="welcomeTitle">Welcome!</h1>
               </div>               
               <div id="statistics">
                 <div id="dailyTargetIncome">
                    <p id="dailyTargetTitle">Daily Target Income</p>
                    <div id="targetWrapper">
                        <svg class="circleWrapper" width="300" height="300">
                            <circle cx="150" cy="150" r="90"  class="track"></circle>
                            <circle cx="150" cy="150" r="90"  id="progressCircle"></circle>   
                        </svg>    
                        <div  id="inner">
                            <p id="percentage">{dailyTargetPercentage(dailyIncome)}%</p>
                        </div>                        
                    </div>    
                    <div>
                        <p id="dailyIncome">&euro;{dailyIncome}</p><br />
                        <p id="targetIncomeAmount">from &euro;500</p>
                    </div>    
                 </div>
                 <div className="statisticsWrapper" id="orderTab">
                    <div className="ordersCustomers">
                        <div className="amountLabelWrapper">
                            <p id="totalOrders">{ totalOrders }</p>
                            <p id="ordersWord">Orders</p>
                        </div> 
                        <div id="ordersIconWrapper">
                            <FontAwesomeIcon icon={ faShoppingCart }/>
                        </div>
                    </div>
                    <div id="revenueChart">
                        <p id="chartTitle">Weekly Revenue</p>
                        <div id="chartWrapper">
                            <svg ref={ chartRef} id="barChart"></svg>
                        </div>
                    </div> 
                 </div>  
                 <div className="statisticsWrapper" id="customerTab">
                    <div className="ordersCustomers"> 
                        <div className="amountLabelWrapper">
                            <p id="totalCustomers">{ totalCustomers }</p>
                            <p id="customersWord">Customers</p>
                        </div> 
                        <div id="customersIconWrapper">
                            <FontAwesomeIcon icon={ faUsers }/>
                        </div>
                    </div>
                    <div id="totalRevenue">
                        <p id="totalRevenueTitle">Total Revenue</p>
                        <p id="totalRevenueAmount">&euro;{ totalRevenue }</p>
                        <div id="walletIcon">
                            <FontAwesomeIcon icon={ faCoins }/>
                            <FontAwesomeIcon icon={ faMoneyBillWave }/>
                        </div>
                    </div> 
                 </div>                
               </div>
               <div id="trendingOrdersContainer">
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