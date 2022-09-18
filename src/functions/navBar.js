//The function that shows and hide the cataloque submenu on nav-bar.
export const catalogueChoices = () => {

    let addProduct = document.getElementById("addProduct")
    let preview = document.getElementById("preview")
    let catalogue = document.getElementById("catalogue")
    let display = preview.style.display

    if(display === "none"){
        addProduct.style.display = "initial"
        preview.style.display = "initial"
        catalogue.style.height = "150px"
    } else {
        addProduct.style.display = "none"
        preview.style.display = "none"
        catalogue.style.height = "70px"
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