importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js")
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

firebase.initializeApp(firebaseConfig)
const channel = new BroadcastChannel(`${firebaseConfig?.projectId}-messages`)
const messaging = firebase.messaging()
const handleMessage = payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  )
  channel.postMessage(payload)
}
messaging.onBackgroundMessage(handleMessage)
