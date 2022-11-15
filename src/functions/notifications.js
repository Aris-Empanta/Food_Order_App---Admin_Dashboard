export const notificationType = (type) => {
    
    return type === "order" ? "O": "M"
}

export const renderClass = (type) => {

    return type === "order" ? "orderType": "messageType"
}

export const fetchNotifications = (axios, callback, hideLoadingSpinner) => {

    axios.get("https://restaurant-server.arisdb.myipservers.gr/notifications/customers-info")
             .then( res => { 
                            hideLoadingSpinner("notificationsLoader")
                            callback(res.data)})
}

export const createLink = (type) => {
 
    return type === 'order' ? '#/orders' : '#/chat'
}