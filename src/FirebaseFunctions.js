import { finalOrderCollection } from "./FirestoreCollectionNames"
import { DB, firestore } from "./firebaseSetting"

export const fetchPage = data => {
  const {
    reducerVar,
    type,
    collectionPath,
    orderBy,
    orderByMethod = "desc",
    limit = 2,
    setBusy,
    onEnd,
    dispatch,
    onLastChange,
    state,
    parentDBRef,
    clearBeforeFetch,
  } = data || {}
  if (clearBeforeFetch) {
    // console.log("Clearning....");
    dispatch({
      type: "CLEAR",
      clearVar: reducerVar,
    })
  }
  const { firebaseLastRow } = state || {}
  const last = firebaseLastRow && firebaseLastRow[reducerVar]
  let collectionRef = parentDBRef || DB.collection(collectionPath)

  setTimeout(() => {
    //  console.log("Fetching....");
    let mainRef
    if (setBusy) {
      setBusy(true)
    }
    //  console.log("1");
    if (last) {
      // console.log("1.1");
      mainRef = collectionRef
        .orderBy(orderBy, orderByMethod)
        .startAfter(last)
        .limit(limit)
    } else {
      //  console.log("1.2");
      mainRef = collectionRef.orderBy(orderBy, orderByMethod).limit(limit)
    }
    // console.log("2");
    mainRef.get().then(querySnapshot => {
      // console.log("2.5");
      if (querySnapshot.empty && setBusy) {
        if (onEnd) onEnd(true)
        return setBusy()
      }
      // console.log("3");
      let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      let arrDocs = []
      if (lastVisible) {
        // console.log(3.5, lastVisible)
        let lastPayload = {}
        lastPayload[reducerVar] = lastVisible
        // console.log(3.5, lastPayload)

        dispatch({
          type: "SET_FIRESTORE_LAST",
          firebaseLastRow: lastPayload,
        })
        if (onLastChange) onLastChange(lastVisible)
      }
      // console.log("4");
      let payLoad = {}
      querySnapshot.forEach(doc => {
        let store = { id: doc.id, data: doc.data() }
        arrDocs.push(store)
        payLoad[reducerVar] = arrDocs
      })
      // console.log("arrDocs", arrDocs, payLoad, type);
      setBusy()
      dispatch({
        type: type,
        ...payLoad,
      })
    })
  }, 10)
}
export const fetchDocs = data => {
  const {
    reducerVar,
    type,
    collectionPath,
    orderBy,
    orderByMethod = "desc",
    limit = 2,
    setBusy,
    onEnd,
    dispatch,
    onLastChange,
    state,
    parentDBRef,
    clearBeforeFetch,
  } = data || {}
  if (clearBeforeFetch) {
    // console.log("Clearning....");
    dispatch({
      type: "CLEAR",
      clearVar: reducerVar,
    })
  }
  const { firebaseLastRow } = state || {}
  const last = firebaseLastRow && firebaseLastRow[reducerVar]
  // console.log('Last', last, state)
  let collectionRef = parentDBRef || DB.collection(collectionPath)

  setTimeout(() => {
    //  console.log("Fetching....");
    let mainRef
    if (setBusy) {
      setBusy(true)
    }
    let tempRef = collectionRef
    // console.log("1");
    if (orderBy && orderByMethod) {
      tempRef = collectionRef.orderBy(orderBy, orderByMethod)
    } else {
      tempRef = collectionRef
    }
    if (last) {
      // console.log("1.1");
      mainRef = tempRef.startAfter(last).limit(limit)
    } else {
      // console.log("1.2");
      mainRef = tempRef.limit(limit)
    }
    // console.log("2");
    mainRef
      .get()
      .then(querySnapshot => {
        // console.log("2.5", querySnapshot.empty);
        if (querySnapshot.empty && setBusy) {
          if (onEnd) onEnd(true)
          return setBusy()
        }
        // console.log("3");
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        let arrDocs = []
        if (lastVisible) {
          // console.log(3.5, lastVisible)
          let lastPayload = {}
          lastPayload[reducerVar] = lastVisible
          // console.log(3.6, lastPayload)

          dispatch({
            type: "SET_FIRESTORE_LAST",
            firebaseLastRow: lastPayload,
          })
          if (onLastChange) onLastChange(lastVisible)
        }
        // console.log("4");
        let payLoad = {}
        querySnapshot.forEach(doc => {
          let store = { id: doc.id, data: { ...doc.data(), id: doc.id } }
          // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>Doc', store)
          arrDocs.push(store)
          payLoad[reducerVar] = arrDocs
        })
        // console.log("arrDocs", arrDocs, payLoad, type);
        setBusy()
        dispatch({
          type: type,
          reducerVar: reducerVar,
          ...payLoad,
        })
      })
      .catch(err => {
        setBusy && setBusy()
        console.error("error occured: ", err.message)
        onEnd && onEnd(true)
      })
  }, 10)
}
export const transact = data => {
  const { orderID, storeID } = data || {}

  const graceDaysForPayment = 30

  const getStoreFeePercentage = currentMonthTotal => {
    return currentMonthTotal > 1000000
      ? 0.16
      : currentMonthTotal > 500000
      ? 0.12
      : currentMonthTotal > 200000
      ? 0.8
      : currentMonthTotal > 50000
      ? 0.05
      : 0
  }

  return firestore
    .runTransaction(async transaction => {
      let committedOrderRef = DB.collection(
        `${finalOrderCollection}/${storeID}/data`,
      ).doc(orderID)
      const committedOrderDoc = await transaction.get(committedOrderRef)

      const storeMetricsRef = DB.collection("store_metrics").doc(storeID)
      const storeMetricsDoc = await transaction.get(storeMetricsRef)

      const storePaymentsRef = DB.collection("store_payments").doc(storeID)
      const orderValue = committedOrderDoc?.data()?.orderValue

      const currentDate = new Date()
      if (!storeMetricsDoc?.exists) {
        transaction.set(storeMetricsRef, {
          totalOrders: 1,
          ordersByDate: {
            [`${currentDate.getMonth()}_${currentDate.getFullYear()}`]:
              orderValue,
          },
          totalRevenue: orderValue,
        })
      } else {
        const storeMetricsData = storeMetricsDoc?.data()
        const currentMonthTotal =
          (storeMetricsData?.ordersByDate
            ? Number(
                storeMetricsData?.ordersByDate[
                  `${currentDate.getMonth()}_${currentDate.getFullYear()}`
                ],
              )
            : 0) + orderValue

        transaction.update(storeMetricsRef, {
          totalOrders: storeMetricsData?.totalOrders + 1,
          ordersByDate: {
            ...storeMetricsData?.ordersByDate,
            [`${currentDate.getMonth()}_${currentDate.getFullYear()}`]:
              currentMonthTotal,
          },
          totalRevenue: storeMetricsData?.totalRevenue + orderValue,
        })

        const storeFeePercentage = getStoreFeePercentage(currentMonthTotal)
        if (storeFeePercentage) {
          transaction.set(storePaymentsRef, {
            dueDate: new Date(
              currentDate.setDate(currentDate.getDate() + graceDaysForPayment),
            ),
            amount: currentMonthTotal * storeFeePercentage,
          })
        }
      }
    })
    .then(newValue => {
      console.log("Transaction successfully committed!", newValue)
    })
    .catch(error => {
      console.log("Transaction failed: ", error)
    })
}
