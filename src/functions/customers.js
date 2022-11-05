export const searchCustomer = () => {
    let text = document.getElementById('desiredCustomer').value.toLowerCase()
    let customerName = document.getElementsByClassName('customerName')
    let customersData = document.getElementsByClassName('customersData')

    for(let i = 0; i < customerName.length; i++) {

        let name = customerName[i].innerText.toLowerCase()
 
        name.includes(text) || text === ''?
        customersData[i].style.display = "table-row" :
        customersData[i].style.display = "none" 
    }  
}