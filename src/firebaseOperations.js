import { Honeybadger } from "@honeybadger-io/react"
import { DB, firebaseApp } from "./firebaseSetting"
export const handleError = (err, url, docID) => {
  console.error(err)
  const user = firebaseApp.auth().currentUser
  Honeybadger.setContext({
    userEmail: user?.phoneNumber || "Not user",
    userID: user?.uid,
    errorType: "firestore-errors",
    dbPath: url,
    docID: docID,
  })
  Honeybadger.notify(err)
}

export const deleteDocFromDb = async (collectionURL, leafDoc, callback) => {
  await DB.collection(collectionURL)
    .doc(leafDoc)
    .delete()
    .then(() => {
      if (callback) {
        callback()
      }
    })
    .catch(e => handleError(e, collectionURL))
}

export const getDocsFromDb = async collectionURL => {
  const documents = await DB.collection(collectionURL)
    .get()
    .then(snap => {
      return snap.docs.map(doc => ({
        ...doc.data(),
        exists: doc?.exists,
        id: doc?.id,
      }))
    })
    .catch(e => handleError(e, collectionURL))
  return await documents
}

export const getDocFromDb = async (collectionURL, leafDoc) => {
  if (!leafDoc) return
  const data = await DB.collection(collectionURL)
    .doc(leafDoc)
    .get()
    .then(doc => {
      return {
        ...doc?.data(),
        exists: doc?.exists,
        id: doc?.id,
      }
    })
    .catch(e => handleError(e, collectionURL, leafDoc))
  return await data
}

export const getDocsFromDbWhere = async (collectionURL, ...query) => {
  const data = await DB.collection(collectionURL)
    .where(...query)
    .get()
    .then(snap => {
      return snap.docs.map(doc => ({
        ...doc.data(),
        exists: doc?.exists,
        id: doc?.id,
      }))
    })
    .catch(e => handleError(e, collectionURL, query))
  return await data
}

export const getDocsFromDbMultipleWheres = async (collectionURL, ...query) => {
  let collection = await DB.collection(collectionURL)
  for (let oneWhere of query) {
    collection = collection.where(...oneWhere)
  }
  const data = await collection.get().then(snap => {
    return snap.docs.map(doc => ({
      ...doc.data(),
      exists: doc?.exists,
      id: doc?.id,
    }))
  })

  return data
}
export const getDocsFromDbMultipleWheresWithLimit = async (
  limit = 1,
  collectionURL,
  ...query
) => {
  let collection = DB.collection(collectionURL)
  for (let oneWhere of query) {
    collection = collection.where(...oneWhere)
  }
  const data = await collection
    .limit(limit)
    .get()
    .then(snap => {
      return snap.docs.map(doc => ({
        ...doc.data(),
        id: doc?.id,
      }))
    })
    .catch(e => handleError(e, collectionURL, query))

  return data
}

export const addDataToDb = async (url, data, dispatch, message, cb) => {
  return await DB.collection(url)
    .add({
      ...data,
    })
    .then(doc => {
      dispatch &&
        dispatch({
          type: "SHOW_ALERT",
          open: true,
          message,
        })
      cb && cb(doc)
      return "success"
    })
    .catch(e => handleError(e, url, data))
}

export const setDataToDb = async (url, docId, data, dispatch, message, cb) => {
  return await DB.collection(url)
    .doc(docId)
    .set(
      {
        ...data,
      },
      { merge: true },
    )
    .then(doc => {
      dispatch &&
        message &&
        dispatch({
          type: "SHOW_ALERT",
          open: true,
          message,
        })
      cb && cb(doc)
      return "success"
    })
    .catch(e => handleError(e, url, data))
}

export const updateDataToDb = async (
  url,
  docId,
  data,
  dispatch,
  message,
  cb,
) => {
  return await DB.collection(url)
    .doc(docId)
    .update({
      ...data,
    })
    .then(doc => {
      dispatch &&
        message &&
        dispatch({
          type: "SHOW_ALERT",
          open: true,
          message,
        })
      cb && cb(doc)
      return "success"
    })
}
