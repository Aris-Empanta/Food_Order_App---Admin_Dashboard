export const filterName = () => {

    let userInput = document.getElementById("searchBar").value.toLowerCase()
    let names = document.getElementsByClassName("productName")
    let product = document.getElementsByClassName("product")
    let noProductFound = document.getElementById("noProductFound")
    let productInputName = document.getElementById("productInputName")
    let results = 0

    for(let i = 0; i < product.length; i++) {

        let name = names[i].innerText.toLowerCase()
        
        const showProducts = () => {

            product[i].style.display = "flex"
            results += 1
        }
        
        name.includes(userInput) || userInput === ''?
                                     showProducts() :
                  product[i].style.display = "none"
    }

    const productNotFound = () => {

        let userInput = document.getElementById("searchBar").value
    
        noProductFound.style.display = "initial"
        productInputName.innerText = userInput
    }

    results === 0 ?  productNotFound() :
    noProductFound.style.display = "none"
}