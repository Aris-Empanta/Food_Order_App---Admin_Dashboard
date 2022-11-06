export const dailyTargetPercentage = (income) => {

    let targetedIncome = 500
    let percentage = (income / targetedIncome * 100).toFixed(1) 
    
    return percentage
}

export const progressCirclePercentage = (income) => {

    let progressCircle = document.getElementById("progressCircle")
    let targetedIncome = 500    
    let percentage = (income / targetedIncome * 100).toFixed(1)
    let remainingPercentage = ((100 - percentage) / 100).toFixed(3) 
    let strokeDasharrayValue = 565
    let strokeDashoffsetValue = (remainingPercentage * strokeDasharrayValue).toFixed(1) 
   
    progressCircle.style.strokeDashoffset = strokeDashoffsetValue
    console.log(strokeDashoffsetValue)
}