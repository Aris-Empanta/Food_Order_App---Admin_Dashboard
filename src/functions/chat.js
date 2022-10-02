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