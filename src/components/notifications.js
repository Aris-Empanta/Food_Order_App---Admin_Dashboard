import "../css/notifications.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { notificationType, renderClass,
         fetchNotifications, createLink } from "../functions/notifications"
import { hideNotifications } from "../functions/navBar"
import { socket } from "./privateChat";
import { hideLoadingSpinner } from "../functions/general";

export const Notifications = () => {

    const [ notifications, setNotifications ] = useState([])

    useEffect(() => {

        //The function to fetch all notifications
        fetchNotifications(axios, setNotifications, hideLoadingSpinner)

        //Reevaluates notifications list when receiving new message
        socket.on('new message', () => fetchNotifications(axios, setNotifications)) 
        
        //Reevaluates notifications list when receiving new order
        socket.on('new order', () => fetchNotifications(axios, setNotifications)) 

        //Reevaluates unread messages  when admin's chat opens
       socket.on('re-evaluate unread',  () => fetchNotifications(axios, setNotifications))  

        //Reevaluates unchecked orders when we open an order
        socket.on('re-evaluate orders', () => fetchNotifications(axios, setNotifications))
    }, [])

    return(<div id="notificationsComponent"> 
            <div id="notificationsLoader">
                <p>Loading...</p>
            </div>
            { notifications.map( item => <a className="notificationLinks" href={ createLink(item.type) }
                                            onClick = { hideNotifications } >
                                            <div className="notificationsWrapper">
                                                <div className={ renderClass(item.type) } >{ notificationType(item.type) }</div>
                                                <div className="descriptionWrapper">
                                                    <p className="notificationDescription">New { item.type } from 
                                                        <span className="notificationName"> { item.customerName}</span>
                                                    </p>
                                                    <p className="notificationDate">{ item.dateReceived } 
                                                        { item.checkedStatus === 'unChecked' ||
                                                            item.checkedStatus === 'unread' ? 
                                                            <span className="newNotification">new</span> : null }
                                                    </p>
                                                </div>
                                            </div>
                                         </a>
                                        )
                                    }
           </div>)
}