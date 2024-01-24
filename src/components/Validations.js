import * as Yup from "yup"

export const sellerSignupValidation = props => {
  // console.log('llllll');
  return Yup.object().shape({
    seller_name: Yup.string()
      .required(
        "Please fill the seller name so that people can recognize your store",
      )
      .min(3, "Too short")
      .max(100, "Too long")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  })
}

export const signUpValidation = props => {
  return Yup.object().shape({
    name: Yup.string()
      .required("Please enter your name")
      .min(3, "Please enter a valid name")
      .max(100, "Please enter your name"),
    email: Yup.string()
      .required("Email ID is required")
      .email("Please enter a valid email ID"),
    phoneNumber: Yup.string().required("Please enter a valid phone number"),
  })
}
export const autoValidate = (props, fields) => {
  let validation = {}
  fields.forEach(({ name, validate, hidden }) => {
    if (name && !hidden && validate) {
      validation[name] = validate
    }
  })
  console.log(">>>>", validation)
  return Yup.object().shape(validation)
}

export const contactUsGeneralValidation = props => {
  return Yup.object().shape({
    customer_name: Yup.string()
      .required("Please enter the phone number or name of the customer")
      .min(3, "Too short")
      .max(100, "Too long"),
    customer_query: Yup.string()
      .required("Please choose any one of the listed queries")
      .min(3, "Too short")
      .max(100, "Too long"),
  })
}

export const contactUsValidationWithOrders = props => {
  return Yup.object().shape({
    customer_name: Yup.string()
      .required("Please enter the phone number or name of the customer")
      .min(3, "Too short")
      .max(100, "Too long"),
    customer_query: Yup.string()
      .required("Please choose any one of the listed queries")
      .min(3, "Too short")
      .max(100, "Too long"),
    customer_orders: Yup.string()
      .required("Please choose any one of the listed orders")
      .min(3, "Too short")
      .max(100, "Too long"),
  })
}

export const contactUsValidationWithComments = props => {
  return Yup.object().shape({
    customer_name: Yup.string()
      .required("Please enter the phone number or name of the customer")
      .min(3, "Too short")
      .max(100, "Too long"),
    customer_query: Yup.string()
      .required("Please choose any one of the listed queries")
      .min(3, "Too short")
      .max(100, "Too long"),
    customer_comments: Yup.string()
      .required("Please let us know your query in a few words")
      .min(3, "Too short")
      .max(100, "Too long"),
  })
}

export const ContactUsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  query: Yup.string()
    .min(3, "Too Short!")
    .max(250, "Too Long!")
    .required("Required"),
})

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  query: Yup.string()
    .min(3, "Too Short!")
    .max(250, "Too Long!")
    .required("Required"),
})

export const getNumberOfWords = ques => {
  return ques.split(" ").length
}
export const getNumberOfCharacter = ques => {
  return ques.split("").length
}

export const validateInventory = values => {
  let errors = {}
  if (!values.name) {
    errors.name = "Please enter a store name. (Eg: 'Toy shop')"
  } else if (getNumberOfCharacter(values.name) > 100) {
    errors.name = "Character limit is 100"
  }
  return errors
}

export const validateAmount = v => {
  return !v ? "Required" : null
}
export const validateProjectName = v => {
  return !v ? "Required" : null
}
export const validateDesc = v => {
  let error = !v ? "Required" : null
  if (v && v.length > 100)
    error = "Description cannot be greater than 100 characters"
  return error
}

export const valTitle = v => {
  const error = !v ? "Required" : null
  // console.log(">>", error);
  return error
}
export const valPreTitle = v => {
  return !v ? "Required" : null
}

export const valSubTitle = v => {
  return !v ? "Required" : null
}
export const valDescription = v => {
  return !v ? "Required" : null
}
export const valLinkPrimaryLabel = v => {
  return !v ? "Required" : null
}
export const valLinkPrimaryLink = v => {
  return !v ? "Required" : null
}

export const valLinkSecondaryLabel = v => {
  return !v ? "Required" : null
}
export const valLinkSecondaryLink = v => {
  return !v ? "Required" : null
}

export const validatePerson = v => {
  let error = !v ? "Required" : null
  if (v && v.length > 60)
    error = "Person name cannot be greater than 60 characters"
  return error
}

export const urlify = text => {
  let urlRegex = /(https?:\/\/[^\s]+)/g
  return urlRegex.test(text)
    ? null
    : "Please enter a valid URL for example (https://example.com)."
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

export const validateReviewText = text => {
  // Check if text is a string
  if (typeof text !== "string") {
    return "Review text must be a string."
  }

  // Check for empty text
  if (text.trim() === "") {
    return "Review text should not be empty."
  }

  // Check for minimum and maximum length
  if (text.length < 10) {
    return "Review text should be at least 10 characters long."
  }

  if (text.length > 500) {
    return "Review text should not exceed 500 characters."
  }

  // Check for prohibited words
  const prohibitedWords = ["spam", "fake"] // Add more words as needed

  for (const word of prohibitedWords) {
    if (text.toLowerCase().includes(word)) {
      return `The text contains prohibited words: ${word}`
    }
  }

  // If all conditions are met, return null (no error)
  return null
}
