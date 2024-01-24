import React, { Fragment, useEffect, useState } from "react"
import { Col, Row } from "./Grid"
import Button from "./Button"
import Card from "./Card"
import { ColorChooser, InputField } from "./FormComponents"
import Header from "./Header"
import Space from "./Space"
import Expander from "./v2/Expander/Expander"
import { StandaloneImageUploader } from "./v2/StandaloneImageUploader"
import { getSingularFromPlural } from "../Dictionary"
const getOptionHintForCustomization = name => {
  const lowerCaseName = name?.toLowerCase()

  if (["sizes", "size", "siz"].includes(lowerCaseName)) {
    return "Eg: XL"
  }
  if (["colors", "colours", "color", "colour"].includes(lowerCaseName)) {
    return "Eg: red"
  }
  if (["pattern", "patterns"].includes(lowerCaseName)) {
    return "Eg: printed"
  } else {
    // Add more conditions as needed for other customization options
    return ""
  }
}
export default function DynamicFields({
  label,
  desc,
  errorText,
  dataTip,
  info,
  onChange,
  value,
}) {
  // console.log('value', value)
  const [customizations, setCustomization] = useState(
    value || [
      { name: "Color", data: [] },
      { name: "Sizes", data: [] },
    ],
  )
  useEffect(() => {
    setCustomization(value)
  }, [value])
  const [temp, setTemp] = useState()
  const [tempFieldName, setTempFieldName] = useState()
  const [refresh, setRefresh] = useState()

  const addACustomizer = () => {
    setCustomization([...customizations, {}])
    setRefresh(true)
  }
  const setCustomizationName = (n, k) => {
    let temp = [...customizations]
    temp = temp.map((t, key) => (key === k ? { ...t, name: n } : t))
    setCustomization(temp)
    setTemp()
    setRefresh(true)
  }
  const deleteCustomization = k => {
    let temp = [...customizations]
    temp = temp.filter((t, key) => key !== k)
    setCustomization(temp)
    setTemp()
    setRefresh(true)
  }
  const deleteInnerCustomization = (outerKey, innerKey) => {
    let temp = [...customizations]
    let oldData = temp[outerKey].data || []
    let newData = oldData.filter((oldD, keyIn) => keyIn !== innerKey)
    temp = temp.map((t, key) =>
      key === outerKey ? { ...t, data: [...newData] } : t,
    )
    // console.log("temp", temp);
    setCustomization(temp)
    setRefresh(true)
  }
  const addFieldToCustomization = cKey => {
    let temp = [...customizations]
    let oldData = temp[cKey].data || []
    oldData.push({})
    temp = temp.map((t, key) =>
      key === cKey ? { ...t, data: [...oldData] } : t,
    )
    // console.log("temp", temp);
    setCustomization(temp)
    setRefresh(true)
  }
  const setCustomizationFieldName = (newName, cKey, innerKey) => {
    let temp = [...customizations]
    let oldData = temp[cKey].data || []
    oldData[innerKey] = {
      ...oldData[innerKey],
      name: newName,
    }
    temp = temp.map((t, key) =>
      key === cKey ? { ...t, data: [...oldData] } : t,
    )
    setCustomization(temp)
    setTempFieldName()
    setRefresh(true)
  }
  const setCustomizationFieldValue = (newValue, cKey, innerKey) => {
    let temp = [...customizations]
    let oldData = temp[cKey].data || []
    oldData[innerKey] = {
      ...oldData[innerKey],
      value: newValue,
    }
    temp = temp.map((t, key) =>
      key === cKey ? { ...t, data: [...oldData] } : t,
    )
    setCustomization(temp)
    setTempFieldName()
    setRefresh(true)
  }
  const setCustomizationFieldImage = (imageURL, cKey, innerKey) => {
    let temp = [...customizations]
    let oldData = temp[cKey].data || []
    oldData[innerKey] = {
      ...oldData[innerKey],
      imageURL: imageURL,
    }
    temp = temp.map((t, key) =>
      key === cKey ? { ...t, data: [...oldData] } : t,
    )
    setCustomization(temp)
    setTempFieldName()
    setRefresh(true)
  }

  useEffect(() => {
    if (onChange) {
      onChange(customizations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (refresh && onChange) {
      console.log("Onchange called", customizations)
      onChange(customizations)
      setTimeout(() => {
        onChange(customizations)
      }, 500)
      setRefresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])
  // console.log('Refresh', refresh)
  return (
    <div>
      <Space />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header sm bold noMar>
          {label}
          {dataTip && (
            <span className='fas fa-info-circle' data-tip={dataTip || info} />
          )}
        </Header>
        {desc}
        <Space />
        {!temp && (
          <Button
            colored
            noMar
            noTopMar
            disabled={!customizations?.every(c => c.name)}
            onClick={() => addACustomizer()}
          >
            <span className='fas fa-plus' style={{ marginRight: "1rem" }} />{" "}
            {"Add a customization"}{" "}
          </Button>
        )}
      </div>
      <Space lg />
      {customizations &&
        customizations.map((c, k) => {
          return (
            <div key={k}>
              {c.name ? (
                <Expander
                  padded
                  initiallyOpen
                  title={`${k + 1}. ${c.name}`}
                  deleteAction={{
                    onClick: () => deleteCustomization(k),
                    disabled: c.data && c.data.length > 0,
                    label: "Delete customization",
                  }}
                >
                  <Row>
                    <Col xs={12}>
                      {c.data &&
                        c.data.map((f, innerKey) => {
                          return (
                            <div>
                              <Fragment>
                                {c.name.toLowerCase().includes("color") ? (
                                  <Fragment>
                                    <Card>
                                      <Row middle='xs'>
                                        <Col xs={12} sm={6} lg={3}>
                                          <ColorChooser
                                            value={f.value}
                                            onChange={value => {
                                              setCustomizationFieldValue(
                                                value,
                                                k,
                                                innerKey,
                                              )
                                              setCustomizationFieldName(
                                                value?.name,
                                                k,
                                                innerKey,
                                              )
                                            }}
                                          />
                                        </Col>
                                        <Col xs={12} sm={6} lgOffset={3}>
                                          <StandaloneImageUploader
                                            showUploadButton
                                            onUpdate={([image]) => {
                                              console.log("Image", image)
                                            }}
                                            onUpload={([uploadedImg]) => {
                                              console.log(
                                                "Uploaded Image",
                                                uploadedImg,
                                              )
                                              setCustomizationFieldImage(
                                                uploadedImg,
                                                k,
                                                innerKey,
                                              )
                                            }}
                                            onDelete={img =>
                                              setCustomizationFieldImage(
                                                null,
                                                k,
                                                innerKey,
                                              )
                                            }
                                            pathToUpload={
                                              "customization/images"
                                            }
                                            maxNumber={1}
                                            info={
                                              f.name
                                                ? "Please upload a relevant image for " +
                                                  f.name
                                                : "Please upload a relevant image"
                                            }
                                            label={"Image"}
                                            value={f.imageURL}
                                          />
                                        </Col>
                                      </Row>
                                      <Button
                                        noMar
                                        danger
                                        small
                                        onClick={() =>
                                          deleteInnerCustomization(k, innerKey)
                                        }
                                      >
                                        Delete {f.name}
                                      </Button>
                                    </Card>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    {f.name ? (
                                      <Card>
                                        <Row middle='xs'>
                                          <Col xs={12} sm={6}>
                                            <Header md bold>
                                              {f.name}
                                            </Header>
                                            <Space md />
                                          </Col>
                                          <Col xs={12} sm={6}>
                                            <StandaloneImageUploader
                                              showUploadButton
                                              onUpdate={([image]) => {
                                                console.log("Image", image)
                                              }}
                                              onUpload={([uploadedImg]) => {
                                                console.log(
                                                  "Uploaded Image",
                                                  uploadedImg,
                                                )
                                                setCustomizationFieldImage(
                                                  uploadedImg,
                                                  k,
                                                  innerKey,
                                                )
                                              }}
                                              onDelete={img =>
                                                setCustomizationFieldImage(
                                                  null,
                                                  k,
                                                  innerKey,
                                                )
                                              }
                                              pathToUpload={
                                                "customization/images"
                                              }
                                              maxNumber={1}
                                              info={
                                                f.name
                                                  ? "Please upload a relevant image for " +
                                                    f.name
                                                  : "Please upload a relevant image"
                                              }
                                              label={"Image"}
                                              value={f.imageURL}
                                            />
                                          </Col>
                                        </Row>
                                        <Button
                                          noMar
                                          danger
                                          small
                                          onClick={() =>
                                            deleteInnerCustomization(
                                              k,
                                              innerKey,
                                            )
                                          }
                                        >
                                          Delete {f.name}
                                        </Button>
                                      </Card>
                                    ) : (
                                      <Fragment>
                                        <InputField
                                          field={{ name: "" }}
                                          label={`Enter option ${
                                            innerKey + 1
                                          } for ${getSingularFromPlural(
                                            c.name,
                                          )}`}
                                          hint={getOptionHintForCustomization(
                                            c?.name,
                                          )}
                                          onChange={e => {
                                            setTempFieldName(e.target.value)
                                          }}
                                        />
                                        <Button
                                          disabled={!tempFieldName}
                                          onClick={() =>
                                            setCustomizationFieldName(
                                              tempFieldName,
                                              k,
                                              innerKey,
                                            )
                                          }
                                        >
                                          Add
                                        </Button>
                                        <Button
                                          noMar
                                          danger
                                          onClick={() =>
                                            deleteInnerCustomization(
                                              k,
                                              innerKey,
                                            )
                                          }
                                        >
                                          Delete {f.name}
                                        </Button>
                                      </Fragment>
                                    )}
                                  </Fragment>
                                )}
                              </Fragment>
                            </div>
                          )
                        })}
                    </Col>
                  </Row>
                  <Space />
                  <Button
                    onClick={() => addFieldToCustomization(k)}
                    accent
                    iconClass={"fas fa-plus"}
                  >
                    {`Add new ${getSingularFromPlural(c.name)}`}{" "}
                  </Button>
                </Expander>
              ) : (
                <Fragment>
                  <Space lg />
                  <InputField
                    field={{ name: "" }}
                    label={`Enter customization name`}
                    hint='Eg: Sizes'
                    onChange={e => {
                      setTemp(e.target.value)
                    }}
                  />
                  <Button
                    disabled={!temp}
                    onClick={() => setCustomizationName(temp, k)}
                  >
                    Add
                  </Button>
                  <Button danger onClick={() => deleteCustomization(k)}>
                    Cancel
                  </Button>
                </Fragment>
              )}
            </div>
          )
        })}
      {errorText && <div className={"error"}>{errorText}</div>}
    </div>
  )
}
