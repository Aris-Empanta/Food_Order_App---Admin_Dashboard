import "../css/frontDashboard.css"
import { hideNotifications } from "../functions/navBar"
import axios from "axios"
import { useEffect, useRef} from  'react'
import useStateWithCallback from 'use-state-with-callback';
import { dailyTargetPercentage, progressCirclePercentage, createChart } from "../functions/statistics";
import * as d3 from 'd3';

export const FrontDashboard = () => {

    const chartRef = useRef()  

    const [ dailyIncome, setDailyIncome ] = useStateWithCallback(0, () => progressCirclePercentage(dailyIncome))
    const [weeklyRevenues, setWeeklyRevenues ] = useStateWithCallback([], () => createChart(d3, weeklyRevenues, days, chartRef))
    const [days, setDays ] = useStateWithCallback([], () => console.log("hey"))  

    useEffect(() => {

        const endpoints = [
                            "http://localhost:5000/statistics/daily-income",
                            "http://localhost:5000/statistics/weekly-income",
                            "http://localhost:5000/statistics/total-revenue",
                            "http://localhost:5000/statistics/trending-orders"
                        ]
        axios.all(endpoints.map( endpoint => axios.get(endpoint)))
            .then((response) => {   
                                    let dailyRevenues = response[1].data.map( item => parseInt(item.revenue)).reverse()

                                    let days = response[1].data.map( item => item.day.split('')
                                                                                      .splice(0, 3)
                                                                                      .join('')
                                                                                      .toUpperCase())
                                                                .reverse()

                                    
                                    console.log(dailyRevenues)
                                    setDailyIncome(response[0].data.dailyIncome)
                                    setWeeklyRevenues(dailyRevenues)
                                    setDays(days)
                                })             
                 
    }, [setDailyIncome, setWeeklyRevenues])

    return(<div id="frontDashboard" onClick={ hideNotifications }>
               <h1 id="welcomeTitle">Welcome!</h1>
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
                 <div id="revenueChart">
                    <svg ref={ chartRef}></svg>
                 </div>                 
               </div>
            </div>)
}