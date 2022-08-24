export const showMessage = (name, msg) => {
            
    let message = document.createElement("li")
    message.innerHTML = name + ": " + msg
    
    let messages = document.getElementById("messages")
    messages.appendChild(message)
 }