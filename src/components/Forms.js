import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { Col, Row } from "./Grid"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import ReactTooltip from "react-tooltip"
import { DummyData } from "../DummyData"
import { deepCopy, getTime, isDev } from "../GeneralFunctions"
import Button from "../components/Button"
import Header from "../components/Header"
import Space from "../components/Space"

import {
  CheckboxInput,
  InputField,
  NumberField,
  PhoneField,
  Range,
  SelectField,
  TextArea,
} from "../components/FormComponents"
import getSVG from "../images/svgs/svg"
import DynamicFields from "./DynamicFields"
import Highlight from "./Highlight/Highlight"
import LocationMapper from "./v2/LocationMapper/LocationMapper"
import { StandaloneImageUploader } from "./v2/StandaloneImageUploader"
import { ImageUploader } from "./v2/ImageUploader"

export const FormMaker = ({
  initialValues,
  onSubmit,
  submitDisabled,
  submitLabel,
  formName,
  handleChange,
  onChange,
  validation,
  callback = () => null,
  onCancel,
  autoFill,
  secAction,
  validateOnMount,
  showBack,
  desc,
  svgImage,
  disableSubmit,
  extraErrors,
  extraComponent,
  mergeHiddenFields,
  busy,
  ...props
}) => {
  // console.log("formName", formName);
  const [oldValues, setOldValues] = useState({})
  const fields = (props?.fields && props?.fields(oldValues)) || []
  const history = useHistory()
  const getComponentFromType = t => {
    if (t === "checkbox") {
      return CheckboxInput
    } else if (t === "text") {
      return InputField
    } else if (t === "number") {
      return NumberField
    } else if (t === "percent") {
      return Range
    } else if (t === "select") {
      return SelectField
    } else if (t === "textarea") {
      return TextArea
    } else if (t === "phoneNumber") {
      return PhoneField
    } else {
      return InputField
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleunload)
    return () => window.removeEventListener("beforeunload", handleunload)
  }, [])

  const handleunload = e => {
    // Cancel the event
    e.preventDefault()
    // Standard-compliant browsers
    e.returnValue = ""
    // Older browsers
    return ""
  }

  // console.log('initialValues', initialValues)

  return !fields ? (
    <div />
  ) : (
    <div>
      <Formik
        initialTouched={{
          field: true,
        }}
        enableReinitialize
        initialValues={
          initialValues
            ? initialValues
            : isDev && autoFill
            ? DummyData[autoFill]
            : {}
        }
        validateOnMount={validateOnMount}
        validationSchema={
          validation ? validation(props, fields, oldValues) : null
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let extraData = {}
          if (mergeHiddenFields) {
            const hiddenFields = fields && fields.filter(f => f.hidden)
            hiddenFields.forEach(f => {
              extraData[f.name] = f.value
            })
          }
          // console.log('LOLOLL', values);
          let time = initialValues
            ? {
                updatedAt: getTime(),
              }
            : {
                createdAt: getTime(),
              }
          let formValuesFinal = {
            ...values,
            ...time,
            ...extraData,
          }

          if (onSubmit) onSubmit(formValuesFinal)
          setSubmitting(false)
          if (callback) callback()
          resetForm()
        }}
      >
        {formProps => {
          if (
            JSON.stringify(oldValues) !== JSON.stringify(formProps.values) &&
            handleChange
          ) {
            handleChange({ ...formProps.values })
            setOldValues(deepCopy(formProps.values))
          }
          return (
            <Form onChange={onChange}>
              {formName && (
                <Row middle='xs'>
                  <Col xs={12} md={10}>
                    <Header xl bold accent>
                      {formName}
                    </Header>
                    <Header>{desc}</Header>
                  </Col>

                  {desc ? <Space lg /> : ""}
                  <Col xs={12} md={2}>
                    {svgImage && getSVG(svgImage, null, null, true)}
                  </Col>
                </Row>
              )}

              <Row style={{ paddingTop: "2rem" }}>
                {fields &&
                  fields.map((f, k) => {
                    return f.type === "dynamic" ? (
                      <Col key={k} xs={12} sm={12} md={12}>
                        <Space />
                        <DynamicFields
                          onChange={data => {
                            // console.log("Change ata")
                            formProps.setFieldValue(f?.name, data)
                            if (f?.onChange) f?.onChange(data)
                          }}
                          info={f.info}
                          label={f.label}
                          desc={f.desc}
                          value={formProps?.values && formProps?.values[f.name]}
                          errorText={
                            formProps?.values && formProps?.errors[f.name]
                          }
                        />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                      </Col>
                    ) : f.type === "location" ? (
                      <Col key={k} xs={12} sm={12} md={f.fullWidth ? 12 : 6}>
                        <Space />
                        {console.log("formProps?.values", formProps?.values)}
                        <LocationMapper
                          onChange={place => {
                            formProps.setFieldValue(f?.name, place)
                          }}
                          info={f.info}
                          label={f.label}
                          value={formProps?.values && formProps?.values[f.name]}
                          errorText={
                            formProps?.values && formProps?.errors[f.name]
                          }
                        />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                      </Col>
                    ) : f.type === "pic" ? (
                      <Col key={k} xs={12} sm={12} md={f.fullWidth ? 12 : 6}>
                        <Space />
                        <StandaloneImageUploader
                          onUpdate={([image]) => {
                            formProps.setFieldValue(
                              f?.name,
                              image ? image["data_url"] : null,
                            )
                            formProps.setFieldValue(
                              f?.name + "_file",
                              image ? image["file"] : null,
                            )
                          }}
                          onDelete={img =>
                            formProps.setFieldValue(f?.name, null)
                          }
                          pathToUpload={"/"}
                          maxNumber={1}
                          info={f.info}
                          label={f.label}
                          value={formProps?.values && formProps?.values[f.name]}
                          errorText={
                            formProps?.values && formProps?.errors[f.name]
                          }
                        />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                      </Col>
                    ) : f.type === "pics" ? (
                      <Col key={k} xs={12} sm={12} md={f.fullWidth ? 12 : 6}>
                        <Space />
                        <ImageUploader
                          onUpdate={images => {
                            console.log("onUpdate", images)
                            formProps.setFieldValue(f?.name, images)
                          }}
                          onDelete={images => {
                            f?.onDelete && f?.onDelete(images)
                            formProps.setFieldValue(f?.name, images)
                          }}
                          info={f.info}
                          label={f.label}
                          value={formProps?.values && formProps?.values[f.name]}
                          errorText={
                            formProps?.values && formProps?.errors[f.name]
                          }
                        />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                        <Space />
                      </Col>
                    ) : f.group ? (
                      <Col key={k} xs={12}>
                        <Space />
                        <Space />
                        <Header sm bold>
                          {f.group}
                        </Header>
                        {f.desc}
                        <Space />
                        {f.desc ? <Space lg /> : ""}
                      </Col>
                    ) : (
                      <Col key={k} xs={12} sm={12} md={f.fullWidth ? 12 : 6}>
                        {!f.hidden && (
                          <>
                            <Space />
                            {f.name ? (
                              <Field
                                name={f.name}
                                label={f.label}
                                dataTip={f.dataTip || f.info}
                                desc={f.desc}
                                loading={f?.loading || f?.busy}
                                disabled={f?.loading || f?.busy || f?.disabled}
                                onChange={f?.onChange}
                                onBlur={f?.onBlur}
                                component={getComponentFromType(f.type)}
                                max={f.max}
                                min={f.min}
                                step={f.step}
                                value={f?.value}
                                initialValue={f?.initialValue}
                              >
                                {f.children}
                              </Field>
                            ) : (
                              ""
                            )}
                            {f.extra}
                            <Space />
                            <Space />
                          </>
                        )}
                      </Col>
                    )
                  })}
                <Space />
              </Row>
              <Row>
                {extraErrors?.length > 0 ? (
                  <Col xs={12}>
                    <Highlight type='danger'>
                      <ul>
                        {extraErrors.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </Highlight>
                    <Space lg />
                  </Col>
                ) : (
                  " "
                )}
                {/* {console.log(
                  "Disabled Condition",
                  !formProps?.isValid,
                  formProps,
                  disableSubmit,
                  extraErrors?.length > 0,
                )} */}
                {extraComponent}
                <Col xs={12}>
                  <Button
                    submit
                    marRight
                    loading={formProps.isSubmitting || busy}
                    disabled={
                      !formProps?.isValid ||
                      disableSubmit ||
                      extraErrors?.length > 0
                    }
                    colored
                  >
                    {submitLabel || "Submit"}
                  </Button>
                  {onCancel && (
                    <Button accent onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  {secAction && (
                    <Button
                      accent
                      danger={secAction.danger}
                      warn={secAction.danger}
                      onClick={secAction.onClick}
                      disabled={secAction.disabled}
                    >
                      {secAction.label}
                    </Button>
                  )}
                  {showBack && (
                    <Button accent onClick={() => history.goBack()}>
                      Back
                    </Button>
                  )}
                </Col>
              </Row>
              <Space />
              <Space />
              <Space />
            </Form>
          )
        }}
      </Formik>
      <ReactTooltip />
    </div>
  )
}
