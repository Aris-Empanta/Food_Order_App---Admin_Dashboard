import "../css/notifications.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { notificationType, renderClass,
         fetchNotifications } from "../functions/notifications"
import { socket } from "./privateChat";

export const Notifications = () => {

    const [ notifications, setNotifications ] = useState([])

    useEffect(() => {

        //The function to fetch all notifications
        fetchNotifications(axios, setNotifications)

        //Reevaluates notifications list when receiving new message
        socket.on('new message', () => fetchNotifications(axios, setNotifications)) 
        
        //Reevaluates notifications list when receiving new order
        socket.on('new order', () => fetchNotifications(axios, setNotifications)) 
    }, [])

    return(<div id="notificationsComponent">
            { notifications.map( item => <div className="notificationsWrapper">
                                            <div className={ renderClass(item.type) } >{ notificationType(item.type) }</div>
                                            <div className="descriptionWrapper">
                                                <p className="notificationDescription">New { item.type } from 
                                                    <span className="notificationName"> { item.customerName}</span>
                                                </p>
                                                <p className="notificationDate">{ item.dateReceived }</p>
                                            </div>
                                            <hr />
                                         </div>
                                        )
                                    }
           </div>)
}