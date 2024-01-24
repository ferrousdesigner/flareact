import React, { useEffect, useState } from "react"
import "../styles/form_components.css"
import Button from "./Button"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Chip from "@mui/material/Chip"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import CircularProgress from "@mui/material/CircularProgress"
import "react-phone-number-input/style.css"
import PhoneInputWithCountrySelect from "react-phone-number-input"
import Checkbox from "@mui/material/Checkbox"
import { FormControlLabel } from "@mui/material"
import Space from "./Space"
import Header from "./Header"
import Dialog from "./Dialog"
import { allColors } from "../Constants/Colors"
import { Col, Row } from "./Grid"
import { log } from "../GeneralFunctions"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

export class InputField extends React.Component {
  state = {
    listActive: false,
  }
  selectNode
  toggleList = () =>
    this.setState({ listActive: !this.state.listActive }, () => {})
  render() {
    const {
      field,
      label,
      withButton,
      withIcon,
      form,
      buttonText = "Search",
      hint = "",
      type,
      dataTip,
      errorText,
      onButtonClick,
      busy,
      buttonDisabled,
      buttonBusy,
      initialValue,
      desc,
      ...props
    } = this.props

    const { touched = {}, errors = {} } = form || {}
    const { listActive } = this.state
    const hasErrors =
      field && field?.name && field?.name.includes(".")
        ? errors &&
          errors[field?.name.split(".")[0]] &&
          errors[field?.name.split(".")[0]][field?.name.split(".")[1]]
        : errors[field?.name]
    const hasTouched =
      field && field?.name && field?.name.includes(".")
        ? touched &&
          touched[field?.name.split(".")[0]] &&
          touched[field?.name.split(".")[0]][field?.name.split(".")[1]]
        : touched[field?.name]
    return (
      <div
        className={props.big ? "input-field big smooth" : "input-field smooth"}
        style={{
          borderColor:
            errorText || (hasTouched && hasErrors)
              ? "var(--error-font-color)"
              : "",
          marginBottom: errorText || (hasTouched && hasErrors) ? "6rem" : "",
          height: type === "textarea" ? "auto" : "",
        }}
      >
        {label && (
          <label
            style={{
              color:
                errorText || (hasTouched && hasErrors)
                  ? "var(--error-font-color)"
                  : "",
            }}
          >
            {label}{" "}
            {dataTip && (
              <span className='fas fa-info-circle' data-tip={dataTip} />
            )}
            {desc ? <span className='label-desc'>({desc})</span> : ""}
          </label>
        )}

        {type === "textarea" ? (
          <textarea
            type='text'
            placeholder={hint}
            {...field}
            value={field?.value || props?.value}
            onChange={e => {
              if (field?.onChange) field?.onChange(e)
              if (props?.onChange) props?.onChange(e)
            }}
            onBlur={e => {
              if (field?.onBlur) field?.onBlur(e)
              if (props?.onBlur) props?.onBlur(e)
            }}
          />
        ) : (
          <input
            type={type || "text"}
            {...props}
            {...field}
            value={field?.value || props?.value}
            onChange={e => {
              if (field?.onChange) field?.onChange(e)
              if (props?.onChange) props?.onChange(e)
            }}
            onBlur={e => {
              if (field?.onBlur) field?.onBlur(e)
              if (props?.onBlur) props?.onBlur(e)
            }}
            placeholder={hint}
          />
        )}
        {(errorText || (hasTouched && hasErrors)) && (
          <div className={"error"}>{errorText || hasErrors}</div>
        )}
        {props.list && (
          <span
            onClick={this.toggleList}
            className={
              listActive
                ? "input-chev fas fa-chevron-up"
                : "input-chev fas fa-chevron-down"
            }
          />
        )}
        {props.list && (
          <div
            className={
              listActive ? "input-select-list open" : "input-select-list"
            }
          >
            <select ref={n => (this.selectNode = n)}>
              <option value={""}>Select from previous portfolio</option>
              {props.list.map((item, k) => (
                <option value={item.value || item.label} key={k}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {withButton && (
          <Button
            busy={busy}
            disabled={buttonDisabled}
            colored
            onClick={() => onButtonClick(field?.value)}
          >
            {buttonText}
          </Button>
        )}
        {true && <span className='input-field-icon'>{withIcon}</span>}
      </div>
    )
  }
}
export const Range = ({ field, errorText, label, form, dataTip, ...props }) => {
  const { initialValue } = field || {}
  const { touched = {}, errors = {} } = form || {}
  const hasErrors =
    field && field?.name && field?.name.includes(".")
      ? errors &&
        errors[field?.name.split(".")[0]] &&
        errors[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : errors[field?.name]
  const hasTouched =
    field && field?.name && field?.name.includes(".")
      ? touched &&
        touched[field?.name.split(".")[0]] &&
        touched[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : touched[field?.name]

  return (
    <div>
      {label && (
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color:
              errorText || (hasTouched && hasErrors)
                ? "var(--error-font-color)"
                : "",
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            {label}{" "}
            {dataTip && (
              <span className='fas fa-info-circle' data-tip={dataTip} />
            )}
          </span>
          <span style={{ color: "var(--main-font-color)", fontSize: "2rem" }}>
            {field?.value || 0}%
          </span>
        </label>
      )}
      <input
        type='range'
        {...props}
        {...field}
        onChange={e => {
          if (field?.onChange) field?.onChange(e)
          if (props?.onChange) props?.onChange(e)
        }}
        value={field.value || props.value || initialValue || 0}
      />
      {(errorText || (hasTouched && hasErrors)) && (
        <div className={"error"}>{errorText || hasErrors}</div>
      )}
    </div>
  )
}

export const PhoneField = ({
  field,
  label,
  withButton,
  form,
  buttonText = "Search",
  hint = "",
  type,
  dataTip,
  errorText,
  onButtonClick,
  busy,
  hideCaptcha,
  ...props
}) => {
  const { touched = {}, errors = {} } = form || {}
  const [customValue, setValue] = useState(field.value)
  const hasErrors =
    field && field?.name && field?.name.includes(".")
      ? errors &&
        errors[field?.name.split(".")[0]] &&
        errors[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : errors[field?.name]
  const hasTouched =
    field && field?.name && field?.name.includes(".")
      ? touched &&
        touched[field?.name.split(".")[0]] &&
        touched[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : touched[field?.name]

  useEffect(() => {
    field.onChange({ target: { value: customValue, name: field.name } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customValue])
  return (
    <div>
      <div
        className={props.big ? "input-field big smooth" : "input-field smooth"}
        style={{
          borderColor:
            errorText || (hasTouched && hasErrors)
              ? "var(--error-font-color)"
              : "",
          marginBottom: errorText || (hasTouched && hasErrors) ? "6rem" : "",
          height: type === "textarea" ? "auto" : "",
        }}
      >
        {label && (
          <label
            style={{
              color:
                errorText || (hasTouched && hasErrors)
                  ? "var(--error-font-color)"
                  : "",
            }}
          >
            {label}{" "}
            {dataTip && (
              <span className='fas fa-info-circle' data-tip={dataTip} />
            )}
          </label>
        )}
        <PhoneInputWithCountrySelect
          placeholder='Enter phone number'
          withCountryCallingCode
          name={field.name}
          onChange={v => {
            // console.log('Oncgange', v)
            setValue(v)
          }}
          value={customValue}
        />
        {(errorText || (hasTouched && hasErrors)) && (
          <div className={"error"}>{errorText || hasErrors}</div>
        )}
      </div>
      {!hideCaptcha && <div id='recaptcha-container'></div>}
    </div>
  )
}
export const InputCheck = ({ checked, onChange, label, errorText }) => {
  const label2 = { inputProps: { "aria-label": label } }

  return (
    <div>
      <FormControlLabel
        style={{ alignItems: "flex-start" }}
        control={<Checkbox {...label2} checked={checked} onChange={onChange} />}
        label={label}
      />
      {errorText && <div className={"error"}>{errorText}</div>}
      <Space />
    </div>
  )
}

export const CheckboxInput = ({
  onChange,
  field,
  errorText,
  form,
  label,
  dataTip,
  style,
  ...props
}) => {
  const label2 = { inputProps: { "aria-label": label } }
  log("value", field.value)
  return (
    <div className='checkbox-component'>
      <FormControlLabel
        style={{ alignItems: "flex-start" }}
        control={
          <Checkbox
            {...label2}
            disableRipple
            checked={field.value?.includes("on")}
            name={field.name}
            onChange={e => {
              if (field?.onChange) field?.onChange(e)
              if (props?.onChange) props?.onChange(e)
            }}
          />
        }
        label={label}
      />
      {errorText && <div className={"error"}>{errorText}</div>}
      <Space />
    </div>
  )
}

export const SimpleChip = ({ onClick, label, ...rest }) => {
  return (
    <Chip
      className='simple-chip'
      onD
      label={label}
      onClick={onClick}
      {...rest}
    />
  )
}
export const AutoComplete = ({
  options,
  label,
  loading,
  getOptionLabel,
  value,
  ...rest
}) => {
  return (
    <div className='autocomplete'>
      <Autocomplete
        style={{ borderRadius: "20px" }}
        disablePortal
        value={value}
        id='combo-box-demo'
        options={options}
        getOptionLabel={getOptionLabel}
        sx={{ width: "100%" }}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        {...rest}
      />
    </div>
  )
}
export const TextArea = p => <InputField type='textarea' {...p} />
export const NumberField = p => <InputField type='number' {...p} />
export const SelectField = ({
  field,
  errorText,
  form,
  label,
  dataTip,
  style,
  ...props
}) => {
  let { touched, errors } = form || {}
  // console.log(errorText, 'ERRRRRR');
  const hasErrors =
    form && field && field?.name && field?.name.includes(".")
      ? errors &&
        errors[field?.name.split(".")[0]] &&
        errors[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : errors[field?.name]
  const hasTouched =
    field && field?.name && field?.name.includes(".")
      ? touched &&
        touched[field?.name.split(".")[0]] &&
        touched[field?.name.split(".")[0]][field?.name.split(".")[1]]
      : touched?.[field?.name]
  return (
    <div
      className={
        props.small
          ? "input-field select-small smooth select"
          : "input-field smooth select"
      }
      style={{
        borderColor:
          errorText || (hasTouched && hasErrors)
            ? "var(--error-font-color)"
            : "",
        ...style,
      }}
    >
      {props.loading && <span className='fas fa-circle-notch fa-spin' />}
      {label && (
        <label
          style={{
            color:
              errorText || (hasTouched && hasErrors)
                ? "var(--error-font-color)"
                : "",
          }}
        >
          {label}{" "}
          {dataTip && (
            <span className='fas fa-info-circle' data-tip={dataTip} />
          )}
        </label>
      )}
      <select
        {...field}
        onChange={e => {
          if (field?.onChange) field?.onChange(e)
          if (props?.onChange) props?.onChange(e)
        }}
      >
        <option value={null}> Select a value </option>
        {props.children ||
          (props.list &&
            props.list.map((item, k) => (
              <option value={item.value} key={k}>
                {item.label}
              </option>
            )))}
      </select>
      {((touched && touched[field?.name] && errors[field?.name]) ||
        errorText) && (
        <div className='error'>{errors[field?.name] || errorText}</div>
      )}
    </div>
  )
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export function MultiSelectChips({ value, handleChange, options, label }) {
  const theme = useTheme()

  return (
    <div className='autocomplete' style={{ margin: "2rem 0" }}>
      <FormControl sx={{ m: 0, width: "100%" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label={label} />}
          renderValue={selected => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options?.map(option => (
            <MenuItem
              key={new Date().getTime()}
              value={option}
              style={getStyles(option, value, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export const ColorChooser = ({
  value,
  onChange,
  closeDialogOnChange = true,
}) => {
  const [dialog, setDialog] = useState()
  const [searchText, setSearchText] = useState()
  const colors =
    searchText && searchText !== ""
      ? allColors.filter(c => c.name.includes(searchText))
      : allColors
  return (
    <div>
      <ColorCard
        value={value}
        bottomAction={
          <Button noMar small onClick={setDialog}>
            {value ? "Change Color" : "Choose Color"}
          </Button>
        }
      />

      <Dialog right open={dialog} onClose={() => setDialog()}>
        <Header lg bold>
          Select Color
        </Header>
        <Row>
          <Col xs={12}>
            <InputField
              withButton
              field={{
                onChange: e => setSearchText(e.target.value),
                value: searchText,
              }}
              hintText='Search Color...'
              buttonText={<span className='fas fa-times' />}
              onButtonClick={() => {
                setSearchText("")
              }}
            />
          </Col>
          {colors.map((color, k) => (
            <Col xs={6}>
              <ColorCard
                onClick={color => {
                  onChange && onChange(color)
                  closeDialogOnChange && setDialog()
                }}
                value={color}
                key={k}
              />
            </Col>
          ))}
        </Row>
      </Dialog>
    </div>
  )
}

export const ColorCard = ({ value, selected, onClick, bottomAction }) => {
  const { name, hex } = value || {}
  return (
    <div
      className='color-card'
      onClick={() => onClick && onClick(value)}
      style={selected ? { borderColor: "var(--theme-color)" } : {}}
    >
      <Header bold sm>
        {name}
      </Header>
      <div className='color-card-color' style={{ backgroundColor: hex }} />
      {bottomAction && <Space />}
      {bottomAction}
    </div>
  )
}
