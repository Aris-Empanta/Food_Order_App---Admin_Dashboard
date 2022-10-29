export const notificationType = (type) => {
    
    return type === "order" ? "O": "M"
}

export const renderClass = (type) => {

    return type === "order" ? "orderType": "messageType"
}

export const fetchNotifications = (axios, callback) => {

    axios.get("http://localhost:5000/notifications/customers-info")
             .then( res => callback(res.data))
}