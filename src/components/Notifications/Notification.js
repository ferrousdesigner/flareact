import addNotification from "react-push-notification"
import { DB, firebaseApp, messaging } from "../../firebaseSetting"
import { Fragment, useEffect } from "react"
import logo from "../../images/Icon.png"
import { AppID } from "../../Config"

export const showNotif = ({ title, message, icon }) => {
  return addNotification({
    title: title || "Warning",
    icon: icon,
    message: message || "This is a very long message",
    native: true, // when using native, your OS will handle theming.
  })
}

messaging &&
  messaging.onMessage &&
  messaging.onMessage(payload => {
    console.log("Message Received background message ", payload)
    return showNotif({
      title: payload.notification.title,
      message: payload.notification.body,
      icon: logo,
    })
  })

export const saveTokenToFirestore = token => {
  const user = firebaseApp.auth().currentUser
  if (user) {
    // Save the token under the user's document
    DB.collection("fcmTokens")
      .doc(user.uid)
      .set({ token: token }, { merge: true })
      .then(() => {
        console.log("Token saved to Firestore.")
      })
      .catch(error => {
        console.error("Error saving token to Firestore:", error)
      })
  } else {
    console.warn("User is not authenticated.")
  }
}
export const requestNotificationPermission = () => {
  // Request permission to receive notifications
  messaging &&
    messaging.requestPermission &&
    messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.")
        return messaging.getToken()
      })
      .then(token => {
        console.log("Device token:", token)
        saveTokenToFirestore(token) // Save the token to Firestore
      })
      .catch(error => {
        console.error("Error requesting permission:", error)
      })
}

export const Notifier = () => {
  const channel = new BroadcastChannel(AppID)
  useEffect(() => {
    if (channel) {
      channel.addEventListener("message", payload => {
        const { notification } = payload?.data || {}
        if (notification) {
          console.log("Notifications success")
          showNotif({
            title: notification.title,
            message: notification.body,
            icon: notification.icon,
          })
        } else {
          console.log("Notifications fail")
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Fragment />
}

export const sendNotification = ({ title, body, toUserID }) => {
  if (title && body && toUserID) {
    DB.collection("notifications").add({
      recipientId: toUserID,
      title: title,
      body: body,
    })
  }
}
