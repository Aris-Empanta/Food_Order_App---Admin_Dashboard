//The function that shows and hide the cataloque submenu on nav-bar.
export const catalogueChoices = () => {

    let addProduct = document.getElementById("addProduct")
    let preview = document.getElementById("preview")
    let catalogue = document.getElementById("catalogue")
    let display = preview.style.display
    let arrow = document.getElementById("expandArrow")

    if(display === "none"){
        addProduct.style.display = "initial"
        preview.style.display = "initial"
        catalogue.style.marginBottom = "30px"
        catalogue.style.marginTop = "40px"
        arrow.style.transform = "rotate(90deg)"
    } else {
        addProduct.style.display = "none"
        preview.style.display = "none"
        catalogue.style.marginBottom = "0"
        catalogue.style.marginTop = "0"
        arrow.style.transform = "rotate(0)"
    }                                
}

//The function to fetch the number  of unread messages
export const fetchUnread = (axios, callback) => {

    axios.get('http://localhost:5000/chat-messages/unread-messages')
         .then((res) => { 
                            
                          //If unread messages are '0', They will not be displayed in navbar. 
                          res.data[0].Unread === '0' ? callback("") : 
                                                       callback(res.data[0].Unread)                                        
                        })
}

 //The function to fetch the number  of unchecked orders
export const fetchUncheckedOrders = (axios, callback) => {

    axios.get('http://localhost:5000/orders/unchecked-orders')
        .then((res) => { 
                        
                        //If unread messages are '0', They will not be displayed in navbar. 
                        res.data.length === 0 ? callback("") : 
                                                callback(res.data.length)                                        
                    })
}

export const focus = (id, linkId) => {

    let elements = document.getElementsByClassName("navBarList")
    let current = document.getElementById(id)
    let link = document.getElementById(linkId)

    for( let element of elements) {
        element.classList.remove("focus")
    }

    current.classList.add("focus")
    link.style.color = "purple"
}