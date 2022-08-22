export const showMessage = (msg) => {
            
    let message = document.createElement("li")
    message.innerHTML = msg
    
    let messages = document.getElementById("messages")
    messages.appendChild(message)
 }