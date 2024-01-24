// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
import { firebaseConfig } from "./Config"

export const env = process.env.NODE_ENV

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebaseApp.firestore()
const DB = firestore.collection(env).doc("data")
const auth = firebase.auth()
const storage = firebaseApp.storage()
const FieldValue = firebase.firestore.FieldValue
const getServerTime = () => firebase.firestore.FieldValue.serverTimestamp()
const Timestamp = firebase.firestore.Timestamp
const messaging = firebase.messaging.isSupported()
  ? firebaseApp.messaging(firebaseApp)
  : null
export {
  auth,
  DB,
  storage,
  FieldValue,
  firestore,
  getServerTime,
  Timestamp,
  firebaseApp,
  messaging,
}
