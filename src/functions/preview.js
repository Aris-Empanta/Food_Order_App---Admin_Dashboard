export const filterName = () => {

    let userInput = document.getElementById("searchBar").value.toLowerCase()
    let names = document.getElementsByClassName("productName")
    let product = document.getElementsByClassName("product")

    for(let i = 0; i < product.length; i++) {

        let name = names[i].innerText.toLowerCase()
        name.includes(userInput) || userInput === ''?
        product[i].style.display = "flex" :
        alert("No such product exists!")
    }
}