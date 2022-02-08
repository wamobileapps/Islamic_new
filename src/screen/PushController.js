import React, {Component} from "react";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("token:", token);
        
            },
        
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("ntf:", notification);
                if (notification.action === "ReplyInput") {
                    console.log("texto", notification.reply_text)// this will contain the inline reply text. 
                }
        
                // process the notification
        
                // (required) Called when a remote is received or opened, or local notification is opened
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
        
            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("act:", notification.action);
                console.log("ntfact:", notification);
        
                // process the action
            },
        
            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },
            popInitialNotification: true,
        });
    }

    render(){
        return null;
    }
}


