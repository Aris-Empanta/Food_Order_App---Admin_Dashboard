export const filterName = () => {

    let userInput = document.getElementById("searchBar").value.toLowerCase()
    let names = document.getElementsByClassName("productName")
    let product = document.getElementsByClassName("product")

    for(let i = 0; i < product.length; i++) {
        userInput === names[i].innerText.toLowerCase() || userInput === ''?
        product[i].style.display = "initial" :
        product[i].style.display = "none" 
    }



}