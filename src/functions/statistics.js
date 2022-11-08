//The function that returns the total daily income
export const dailyTargetPercentage = (income) => {

    let targetedIncome = 500
    let percentage = (income / targetedIncome * 100).toFixed(1) 
    
    return percentage
}

//The function that controls the size of the stroke 
//in relation to targeted daily income percentage
export const progressCirclePercentage = (income) => {

    let progressCircle = document.getElementById("progressCircle")
    let targetedIncome = 500    
    let percentage = (income / targetedIncome * 100).toFixed(1)
    let remainingPercentage = ((100 - percentage) / 100).toFixed(3) 
    let strokeDasharrayValue = 565
    let strokeDashoffsetValue = (remainingPercentage * strokeDasharrayValue).toFixed(1) 
   
    progressCircle.style.strokeDashoffset = strokeDashoffsetValue
}

//The functiuon that creates the d3 chart
export const createChart = (d3, weeklyRevenues, days, chartRef) => {

    //set up svg container
    const width = 220
    const height = 200

    const svg = d3.select(chartRef.current)
                  .attr('width', width)
                  .attr('height', height)
                  .style('overflow', 'visible')                   

    //setting the scale
    const xScale = d3.scaleBand()
                     .domain(days.map((val, i) => i))
                     .range([0, width])
                     .padding(0.2)

    const yScale = d3.scaleLinear()
                     .domain([0, 500])
                     .range([height, 0])
                     
    //setting the axes
    const xAxis = d3.axisBottom(xScale)                    
                    .tickFormat((d, i) => days[i])                 
                    
    const yAxis = d3.axisLeft(yScale)
                    .ticks(weeklyRevenues.length)  

    svg.append('g').call(xAxis)
                   .attr('transform', `translate(0, ${height})`)    
                   .attr('color', '#101010')               

    svg.append('g').call(yAxis)
                   .attr('color', '#101010')  

    //setting the svg data
    svg.selectAll('.bar')
       .data(weeklyRevenues)      
       .join('rect')
       .attr('x', (v, i) => xScale(i))  
       .attr('y', yScale) 
       .attr('width', xScale.bandwidth())
       .attr('height', val => height - yScale(val))
       .attr('fill', '#8a2be2')    
}