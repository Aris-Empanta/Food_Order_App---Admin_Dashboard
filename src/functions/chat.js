//Below function combines the 2 needed endpoints in one object array
//and save the in state
export const combineEndpoints = (response, callback) => {

    let customerInfo = []

    let firstPartInfo = response[0].data

    let secondPartInfo = response[1].data
    
    for(let i=0; i < firstPartInfo.length; i++) {

        let object = {...firstPartInfo[i], ...secondPartInfo[i]}

        customerInfo.push(object)

    }

    callback(customerInfo)  
}

//Below function changes the status of a sender's messages
//from 'unRead' to 'read
export const markAsRead = (socket, sender) => {     
      
    socket.emit('message read', sender)
 } 

export const showMessage = (name, msg) => {
    
    let message = document.createElement("li")
    message.innerHTML = name + ": " + msg
    
    let messages = document.getElementById("messages")
    messages.appendChild(message)
 }

//With below function, we allow 8 characters for each customer's name
export const renderName = (text) => {

    return text.length > 8 ? text.split("").slice(0, 8).join("") + "..." : text 
}

//With below function, we allow 60 characters for each message preview
export const renderMessage = (text) => {

    return text.length > 60 ? text.split("").slice(0, 60).join("") + "..." : text 
}

//With below function, every time we check / uncheck a messages, it enters / leaves
//the markedMessages array state.
export const selectMessage = (callback, state, customer, id) => {

    let checkBox = document.getElementById(id)
    let selectAll = document.getElementById("selectAll")
    
    if(checkBox.checked === true ) {

         callback( [...state, customer] ) 
    } else {

        callback( state.filter( item => item !== customer )) 
        selectAll.checked = false
    }                                                   
  }

//The function to select/unselect all messages
export const selectAllMessages = (callback, customersState) => {
    
    let customers = customersState.map( item => item.Customer)
    let checkBoxes = document.getElementsByClassName('checkBoxes')
    let selectAll = document.getElementById("selectAll")

    if(selectAll.checked === true) {

        for(let checkBox of checkBoxes) {

            checkBox.checked = true
        }

        callback([...customers])       
    } else {
        
        for(let checkBox of checkBoxes) {
            checkBox.checked = false
        } 

        callback([])
    }
}