import React, { Component, useEffect, useState } from "react"
import CustomTable from "./CustomTable"
import { fetchPage } from "../../FirebaseFunctions"
import { DB } from "../../firebaseSetting"
import { useStateValue } from "../../StateProvider"
import Loader from "../Loader"

export default function CollectionDataTable({
  isAdmin,
  reducerVar = "storeProducts",
  orderBy,
  orderByMethod,
  limit,
  collection,
  docId,
  subCollection,
  actionType,
  headCells,
}) {
  const [mainState, dispatch] = useStateValue()
  const data = mainState[reducerVar]

  const [busy, setBusy] = useState()
  const [ended, setEnded] = useState()
  const fetch = clearBeforeFetch => {
    if (docId && mainState) {
      console.log(">>>>>")
      fetchPage({
        reducerVar: reducerVar,
        type: actionType || "SET_TABLE_ROWS",
        orderBy: orderBy || "createdAt",
        orderByMethod: orderByMethod || "desc",
        limit: limit || 3,
        setBusy: setBusy,
        onEnd: setEnded,
        dispatch,
        state: mainState,
        clearBeforeFetch: clearBeforeFetch,
        parentDBRef: DB.collection(collection || "products")
          .doc(docId)
          .collection(subCollection || "store_products"),
      })
    }
  }
  useEffect(() => {
    fetch(true)
  }, [docId])

  const makeRows = (keys, data) => {
    let res = []
    data.forEach(dataRow => {
      let obj = {}
      keys.forEach(k => {
        obj[k] = dataRow?.data[k]
      })
      res.push(obj)
    })
    return res
  }
  let finalRows = data
    ? makeRows(
        headCells?.map(h => h.id),
        data,
      )
    : null
  return (
    <div>
      {finalRows ? (
        <CustomTable
          isAdmin={isAdmin}
          rows={finalRows}
          headCells={headCells}
          busy={busy}
          ended={ended}
          fetch={fetch}
        />
      ) : (
        <Loader />
      )}
    </div>
  )
}
