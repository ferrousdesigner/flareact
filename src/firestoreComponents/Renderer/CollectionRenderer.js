import React, { Fragment, useEffect, useState } from "react"
import { Col, Row } from "../../components/Grid"
import { fetchDocs } from "../../FirebaseFunctions"
import { truncate } from "../../GeneralFunctions"
import { useStateValue } from "../../StateProvider"
import { Card, Header, Loader, Space } from "../../components"
import CustomTable from "../../components/CustomTable/CustomTable"
import NoRecord from "../../components/v2/NoRecord/NoRecord"
import { getDocFromDb } from "../../firebaseOperations"
import { DB } from "../../firebaseSetting"
import HorizontalScroll from "../../Home/HorizontalScroll"
const isInViewport = el => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
const getRowsFromAfterLocalFilter = (filters, dataRows) => {
  let finalRows = []
  window.dataRows = dataRows
  finalRows = dataRows.filter(({ data }) =>
    filters.every(f => {
      if (f.operator === "==") {
        return data[f.property] === f.value
      } else if (f.operator === "!=") {
        return data[f.property] !== f.value
      } else if (f.operator === ">=") {
        return data[f.property] >= f.value
      } else if (f.operator === "<=") {
        return data[f.property] <= f.value
      }
      return data[f.property] === f.value
    }),
  )
  // console.log("Test", finalRows);
  return finalRows
}
const getVariableFromCollectionPath = path => path?.replaceAll("/", ".")
export default function CollectionRenderer({
  isAdmin,
  collectionPath,
  sorting,
  filter,
  limit,
  headCells,
  viewType,
  renderDoc,
  shouldCache = true,
  filters,
  onCountChange,
  title,
  noDocComponent,
  noDocMessage,
  renderTableAction,
  noReload,
  paddedTop,
  uppercaseTitle,
  horizontal,
  loaderType,
  variable,
}) {
  const [mainState, dispatch] = useStateValue()
  const [docBusy, setDocBusy] = useState()
  const customVariable =
    variable || getVariableFromCollectionPath(collectionPath)
  const rawRows = mainState[customVariable]
  const dataRows =
    rawRows?.length > 0 && filters?.length > 0
      ? getRowsFromAfterLocalFilter(filters, rawRows)
      : rawRows
  const { orderBy, orderByMethod } = sorting || {}
  const { property, value, operator } = filter || {}
  const [busy, setBusy] = useState()
  const [ended, setEnded] = useState()
  const [ref, setRef] = useState()

  const getMainRefWithFilters = (ref, filters) => {
    let query = ref
    filters?.forEach(f => {
      query = query.where(f.property, f.operator || "==", f.value)
    })
    return query
  }

  const fetch = shouldClearBeforeFetch => {
    if (mainState && collectionPath) {
      setBusy(true)
      // console.log("Collection Loading >>>>");
      fetchDocs({
        reducerVar: customVariable,
        type: "COLLECTION_RENDERER_SET",
        orderBy: orderBy,
        orderByMethod: orderByMethod,
        limit: limit || 3,
        setBusy: setBusy,
        onEnd: setEnded,
        dispatch,
        state: mainState,
        clearBeforeFetch: shouldClearBeforeFetch,
        parentDBRef: filter
          ? DB.collection(`${collectionPath}`).where(
              property,
              operator || "==",
              value,
            )
          : filters
          ? getMainRefWithFilters(DB.collection(`${collectionPath}`), filters)
          : DB.collection(`${collectionPath}`),
      })
    }
  }
  const handleScroll = e => {
    if (isInViewport(ref) && !busy && !ended) fetch()
  }
  const scrollingInElement = horizontal
    ? document.getElementById(customVariable) || window
    : window
  useEffect(() => {
    let isMounted = true // customVariable to track component mount status
    if (ref && isInViewport(ref) && !busy && !ended && isMounted) fetch()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  useEffect(() => {
    let isMounted = true // customVariable to track component mount status
    if (
      [0, undefined, null].includes(dataRows?.length) &&
      !busy &&
      !ended &&
      isMounted
    ) {
      fetch(shouldCache ? null : true)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ref && scrollingInElement) {
      scrollingInElement.addEventListener("scroll", handleScroll)
    }
    return () => scrollingInElement?.removeEventListener("scroll", handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  useEffect(() => {
    let isMounted = true // customVariable to track component mount status
    if (onCountChange && isMounted) {
      onCountChange(dataRows?.length)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRows?.length])

  const makeRows = (keys, dataRows) => {
    let res = []
    dataRows.forEach(dataRow => {
      let obj = {}
      keys.forEach(k => {
        obj[k] = dataRow?.data[k]
      })
      res.push(obj)
    })
    return res
  }
  let finalRows =
    viewType === "table" && dataRows
      ? makeRows(
          headCells?.map(h => h.id),
          dataRows,
        )
      : null

  const onUpdate = async docID => {
    setDocBusy(docID)
    let updatedDoc = await getDocFromDb(collectionPath, docID)
    let newRows = [...rawRows]
    // console.log(
    //   "Old Data",
    //   rawRows.filter(s => s.id === docID),
    // )
    newRows = newRows.map(row =>
      row.id === docID ? { id: row.id, data: updatedDoc } : row,
    )
    // console.log(
    //   "New Data",
    //   newRows.filter(s => s.id === docID),
    // )
    await dispatch({
      type: "COLLECTION_RENDERER_REPLACE",
      reducerVar: customVariable,
      newRows: newRows,
    })
    setDocBusy()
  }
  // console.log("finalRows", finalRows, dataRows);
  const Wrapper = horizontal ? HorizontalScroll : Fragment
  const AnchorLoader = (
    <Fragment>
      {busy && <Loader type={loaderType} />}
      {!busy && (
        <span
          style={{
            width: "1px",
            height: "1rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "1rem",
            margin: horizontal ? "0 auto" : "",
          }}
        >
          <div ref={n => setRef(n)} />
          {/* {shouldCache && dataRows?.length > 0 && !noReload && (
        <Button small onClick={fetch} disabled={busy}>
          Reload
        </Button>
      )} */}
        </span>
      )}{" "}
    </Fragment>
  )

  const idProp = horizontal
    ? {
        id: customVariable,
      }
    : {}
  return (
    <Fragment>
      {paddedTop ? <Space lg /> : ""}
      {(title || uppercaseTitle) && !(!dataRows || dataRows?.length === 0) && (
        <Row start='xs'>
          <Col xs={12}>
            {!uppercaseTitle ? (
              <Header noMar md bold>
                {title}
              </Header>
            ) : (
              <Header accent uppercase sm bold>
                {uppercaseTitle}
              </Header>
            )}
          </Col>
        </Row>
      )}
      {(!viewType || viewType === "table") && (
        <div>
          {headCells ? (
            finalRows && (
              <CustomTable
                renderTableAction={renderTableAction}
                isAdmin={isAdmin}
                rows={finalRows}
                rawRows={dataRows}
                headCells={headCells}
                busy={busy}
                ended={ended}
                rowBusyID={docBusy}
                fetch={fetch}
                refresh={id => {
                  onUpdate(id)
                }}
              />
            )
          ) : (
            <h1>Please provide headCells props for table</h1>
          )}
        </div>
      )}
      {viewType === "card" && (
        <div>
          {dataRows?.map(({ data, id }) => {
            // console.log("Row", data);
            return (
              <Card key={id} lowPadTop>
                <Header md bold>
                  {data.name || data.label || data.brand || id}
                </Header>
                <Row>
                  <Col xs={12} sm={data.image || data.images ? 8 : 12}>
                    <Row>
                      {Object.keys(data).map(k => {
                        // console.log(k, JSON.stringify(data[k]));
                        return (
                          <Col xs={12} md={6} lg={3} key={k}>
                            <Header bold>
                              <span>{k}</span>
                            </Header>
                            <div style={{ overflow: "hidden" }}>
                              {truncate(JSON.stringify(data[k]), 80)}
                            </div>
                            <Space />
                          </Col>
                        )
                      })}
                    </Row>
                  </Col>
                  {(data.image || data.images) && (
                    <Col xs={12} sm={4}>
                      <img
                        alt={id}
                        src={data.image || data.images[0]}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: 200,
                          borderRadius: "2rem",
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </Card>
            )
          })}
        </div>
      )}
      {viewType === "custom" &&
        (renderDoc ? (
          <Wrapper {...idProp}>
            {dataRows?.map(d => {
              return renderDoc(d, () => onUpdate(d.id), docBusy === d.id)
            })}
            {horizontal ? AnchorLoader : ""}
          </Wrapper>
        ) : (
          <Fragment>
            <h1>Please provide a renderRow component</h1>
          </Fragment>
        ))}
      {!horizontal ? AnchorLoader : ""}
      {ended && (!dataRows || dataRows?.length === 0) && (
        <div>
          {noDocMessage ? (
            <NoRecord type={"general"} svg={"product"}>
              {noDocMessage}
            </NoRecord>
          ) : noDocComponent ? (
            noDocComponent
          ) : (
            ""
          )}
        </div>
      )}
    </Fragment>
  )
}
