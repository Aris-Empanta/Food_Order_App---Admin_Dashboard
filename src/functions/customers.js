export const searchCustomer = () => {
    
    let text = document.getElementById('desiredCustomer').value.toLowerCase()
    let customerName = document.getElementsByClassName('customerName')
    let customersData = document.getElementsByClassName('customersData')
    let customerTable = document.getElementById("customerTable")
    let noCustomerFound = document.getElementById("noCustomerFound")
    let customerInputName = document.getElementById("customerInputName")
    let results = 0

    for(let i = 0; i < customerName.length; i++) {

        let name = customerName[i].innerText.toLowerCase()

        const showCustomers = () => {
            customersData[i].style.display = "table-row"
            results += 1
        }
 
        name.includes(text) || text === ''?
        showCustomers() : customersData[i].style.display = "none" 
    }  

    const customerNotFound = () => {
        let input = document.getElementById('desiredCustomer').value
        customerTable.style.display = "none"
        noCustomerFound.style.display = "initial"
        customerInputName.innerText = input
    }

    const customerFound = () => {
        customerTable.style.display = "initial"
        noCustomerFound.style.display = "none"
    }

    results === 0 ?  customerNotFound() :
                        customerFound()

}