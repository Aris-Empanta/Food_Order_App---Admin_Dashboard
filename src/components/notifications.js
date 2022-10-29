import "../css/notifications.css"
import axios from "axios"
import { useEffect, useState } from "react"

export const Notifications = () => {

    const [ notifications, setNotifications ] = useState([])

    useEffect(() => {

        axios.get("http://localhost:5000/notifications/customers-info")
             .then( res => setNotifications(res.data))
    }, [setNotifications])

    return(<div id="notificationsComponent">
            { notifications.map( item => <div>
                                            <p>New { item.type } from {item.customerName}</p>
                                            <p>{ item.dateReceived }</p>
                                         </div>
                                        )
                                    }
           </div>)
}