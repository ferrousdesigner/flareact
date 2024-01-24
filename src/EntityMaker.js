import React, { useState, useEffect, Fragment } from "react"
import { DB } from "./firebaseSetting"
import { cleanObject, isDev, isMobile } from "./GeneralFunctions"
import { useStateValue } from "./StateProvider"
import { Busy } from "./components/v2/Busy/Busy"
import Jumbotron from "./components/Jumbotron/Jumbotron"
import { Grid, Col, Row } from "./components/Grid"
import { FormMaker } from "./components/Forms"
import Divider from "./components/Divider"
import Space from "./components/Space"

import Button from "./components/Button"

const EntityMaker = ({ onProfile, showBack, ...props }) => {
  const [{ entities }, dispatch] = useStateValue()
  const [busy, setBusy] = useState()
  const [selectedEntity, setSelectedEntity] = useState()
  const {
    fields,
    collectionName,
    scopedOn,
    entityName,
    title,
    desc,
    reducerVar,
    renderEntity,
    icon,
    md = 12,
    lg = 12,
    onAdd,
    onUpdate,
    loading,
    validation,
    onDelete,
  } = props || {}
  const passedFields = fields && fields().filter(f => !f.hidden)
  const hiddenFields = fields && fields().filter(f => f.hidden)
  // console.log("Hidden Fields", hiddenFields)
  const base =
    scopedOn && collectionName
      ? DB.collection(collectionName).doc(scopedOn).collection("data")
      : {}
  const updateEntity = (data, cb) => {
    setBusy(true)
    if (data && data.id) {
      base
        .doc(data.id)
        .update({
          ...data,
        })
        .then(() => {
          if (isDev) console.log(entityName + " Updated")
          fetchEntity()
          setBusy()
          if (onUpdate) onUpdate(data?.id, data)
          if (cb) cb()
        })
        .catch(error => {
          setBusy()
          console.error("Error writing document: ", error)
        })
    } else {
      let extraData = {}
      hiddenFields.forEach(f => {
        extraData[f.name] = f.value
      })
      console.log("Before cleaned", data)
      let cleanedData = cleanObject(data)
      console.log("After cleaned", cleanedData, extraData)
      base
        .add({
          ...cleanedData,
          ...extraData,
        })
        .then(docRef => {
          if (isDev) console.log(entityName + " Added")
          fetchEntity()
          if (cb) cb()
          if (onAdd) onAdd(docRef?.id)
          // console.log(props, "PROP");
          // props.onRegisterSuccess(extra?.user);
        })
        .catch(error => {
          setBusy()
          console.error("Error writing document: ", error)
        })
    }
  }
  const fetchEntity = () => {
    setBusy(true)
    base.onSnapshot(querySnapshot => {
      let arr = []
      if (querySnapshot.empty) {
        dispatch({
          type: "FETCH_ENTITIES",
          reducerVar: reducerVar,
          data: [],
        })
        setBusy()
      }
      querySnapshot.forEach(doc => {
        arr.push({ id: doc.id, data: doc.data() })
        if (arr.length === querySnapshot.docs.length) {
          dispatch({
            type: "FETCH_ENTITIES",
            reducerVar: reducerVar,
            data: arr,
          })
          setBusy()
        }
      })
    })
  }
  const deleteAdd = (id, entity) => {
    setBusy(true)
    base
      .doc(id)
      .delete()
      .then(() => {
        setBusy()
        if (onDelete) onDelete(entity)
        fetchEntity()
        dispatch({
          type: "SHOW_ALERT",
          open: true,
          message: entityName + " deleted successfully",
        })
      })
  }
  useEffect(() => {
    if (scopedOn && collectionName) {
      fetchEntity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const usableEnities = (entities && entities[reducerVar]) || []
  // console.log(usableEnities);
  return (
    <Busy busy={busy || loading}>
      <Grid>
        <Space />
        <Space />
        <Jumbotron icon={icon} title={title} desc={desc} />
        <Row center={"xs"} start='md'>
          {!selectedEntity &&
            usableEnities?.map(entity => (
              <Col
                xs={11}
                sm={12}
                md={md}
                lg={lg}
                style={{ paddingBottom: "2rem", textAlign: "left" }}
              >
                {renderEntity(entity, disabled => (
                  <Fragment>
                    <Button
                      accent
                      noMar
                      small
                      disabled={disabled}
                      onClick={() =>
                        setSelectedEntity({ id: entity.id, data: entity.data })
                      }
                    >
                      Update
                    </Button>
                    <Button
                      noMar
                      small
                      danger
                      disabled={disabled}
                      onClick={() => deleteAdd(entity.id, entity)}
                    >
                      Delete
                    </Button>
                  </Fragment>
                ))}
              </Col>
            ))}
        </Row>
        <Row center='xs' style={{ textAlign: "left" }}>
          <Col xs={11} md={12}>
            {(selectedEntity ? false : true) && (
              <Button
                accent
                small={isMobile}
                onClick={() => setSelectedEntity({})}
              >
                Add new {entityName}
              </Button>
            )}
            {selectedEntity && (
              <FormMaker
                validation={validation}
                submitLabel={"Save " + entityName}
                fields={() => passedFields}
                initialValues={selectedEntity?.data}
                onSubmit={formValues => {
                  setBusy(true)
                  if (selectedEntity?.id) formValues["id"] = selectedEntity?.id
                  updateEntity(formValues, () => setSelectedEntity(null))
                }}
                onCancel={() => setSelectedEntity(null)}
                showBack={showBack}
              />
            )}
          </Col>
        </Row>
        <Divider />
      </Grid>
    </Busy>
  )
}
export default EntityMaker
