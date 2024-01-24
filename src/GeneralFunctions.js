import CryptoJS from "crypto-js"
import moment from "moment"
import { CurrencySign } from "./Config"
import { auth, getServerTime, storage } from "./firebaseSetting"

const loginRequire = (history, currentPath) => {
  history.push({
    pathname: "/require_login",
    state: {
      goBack: currentPath,
    },
  })
}

export const env = process.env.NODE_ENV
export { loginRequire }

export const canShowMenu = () => !["/login"].includes(window.location.pathname)

export const isDev = process.env.NODE_ENV === "development"

export const currencyformatter = (v, withSign) => {
  let ans = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
    .format(v)
    .toString()
    .split("")
  ans.shift()
  ans = ans.join("")
  return withSign ? CurrencySign + String(ans) : String(ans)
}

export const getTime = () => getServerTime()
export const parseDateTime = d => {
  if (!d) return "-"
  if (d?.nanoseconds) {
    return moment(new Date(d?.toDate())).format("MMMM Do YYYY, h:mma")
  } else {
    return moment(new Date(d)).format("MMMM Do YYYY, h:mma")
  }
}
export const parseFromFirebaseTimestamp = d => {
  return d?.toDate ? d?.toDate() : d
}

export const removeTextFromString = (text, s) => {
  return s.length > text.length ? s.replace(text, "") : ""
}
export const disallowedCharactersInURL = [
  "!",
  "#",
  "$",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "/",
  ":",
  ";",
  "=",
  "?",
  "@",
  "[",
  "]",
  "<",
  ">",
  "%",
  "{",
  "}",
  "|",
  "\\",
  "^",
  "~",
  "`",
  " ",
  "\t",
  "\n",
  "\r",
]

export const parseDate = d => {
  // console.log(">Date", d);
  if (d?.nanoseconds) {
    return moment(new Date(d?.toDate())).format("MMMM Do YYYY")
  } else {
    return moment(new Date(d)).format("MMMM Do YYYY")
  }
}

export const getThumbnailFromProduct = product => {
  const { images, image, product_images, thumbnail_image } = product || {}
  let pImage =
    image ||
    (images && images.length > 0 && images[0]) ||
    thumbnail_image ||
    (product_images && product_images.length > 0 && product_images[0])
  return pImage
}

export const getDataAfterImageUpload = (raw, path = "data") =>
  new Promise((resolve, reject) => {
    console.log(1.1)
    let data = { ...raw }
    let possibleFilesKeys = Object.keys(data).filter(
      k => k.includes("file") && data[k],
    )
    let possibleNonFilesKeys = Object.keys(data).filter(
      k => !k.includes("file"),
    )
    console.log(1.2)
    // console.log("possibleNonFilesKeys", possibleNonFilesKeys);
    let newData = {}
    possibleNonFilesKeys.forEach(k => {
      newData[k] = data[k]
    })
    console.log(1.3)
    let images = []
    if (possibleFilesKeys.length === 0) {
      // console.log("Test");
      console.log(1.4)
      resolve(data)
    }
    console.log(1.5, possibleFilesKeys)
    possibleFilesKeys.forEach(key => {
      let im = {
        field: key.split("_file")[0],
        file: data[key],
        key: key,
      }
      images.push(im)
    })
    console.log(1.6)
    let urlBucket = []

    images.forEach((pic, key) => {
      console.log("File: ", pic)
      if (pic) {
        const user = auth.currentUser
        // console.log("user: ", pic);
        let name = getTime() + "-" + user.uid + "-" + pic?.file?.name
        // make ref to your firebase storage and select images folder
        let storageRef = storage.ref(`${env}/${path}/${name}`)
        // put file to Firebase
        if (!pic.file) {
          return
        }
        let uploadTask = storageRef.put(pic.file)
        uploadTask.on(
          "state_changed",
          () => {},
          err => console.log(err),
          async () => {
            console.log("key + 1", key + 1, images.length)
            let backgroundURL = await uploadTask.snapshot.ref.getDownloadURL()
            urlBucket.push(backgroundURL)
            newData[pic.field] = backgroundURL
            newData[pic.key] = null
            delete newData[pic.key]
            if (urlBucket.length === images.length) {
              console.log("main")
              setTimeout(() => {
                resolve({ ...newData })
              }, 2000)
            } else {
              console.log("else")
            }
          },
        )
      }
    })
  })

export const isMobile = window.innerWidth < 768
export const removeBackground = img => {
  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")
  let image = img

  canvas.height = canvas.width = 135
  ctx.drawImage(image, 0, 0)

  let imgd = ctx.getImageData(0, 0, 135, 135),
    pix = imgd.data,
    newColor = { r: 0, g: 0, b: 0, a: 0 }

  for (let i = 0, n = pix.length; i < n; i += 4) {
    let r = pix[i],
      g = pix[i + 1],
      b = pix[i + 2]

    // If its white then change it
    if (r >= 230 && g >= 230 && b >= 230) {
      // console.log("ARAHA");
      // Change the white to whatever.
      pix[i] = newColor.r
      pix[i + 1] = newColor.g
      pix[i + 2] = newColor.b
      pix[i + 3] = newColor.a
    }
  }

  ctx.putImageData(imgd, 0, 0)
}
export const log = isDev ? console.log : () => {}

export const sanitize = obj => {
  console.log("Old Object", obj)
  if (!obj) return {}
  let newObj = { ...obj }
  Object.keys(obj).forEach(k => {
    if (!obj[k] && obj[k] !== 0) delete newObj[k]
  })
  console.log("New Object", newObj)
  return newObj
}

export const removeDuplicate = (arr, k) => {
  if (!arr || arr.length === 0) return []
  if (k) {
    return arr.reduce((unique, o) => {
      if (!unique.some(obj => obj[k] === o[k])) {
        unique.push(o)
      }
      return unique
    }, [])
  } else {
    return arr.reduce((unique, o) => {
      if (!unique.some(obj => obj === o)) {
        unique.push(o)
      }
      return unique
    }, [])
  }
}
const encrypt = text => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}
const decrypt = data => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
}

export const placeHolderPic =
  "https://firebasestorage.googleapis.com/v0/b/challenge-576ea.appspot.com/o/assets%2Fplaceholder3.png?alt=media&token=c3d9a7e6-dcad-4c0f-9f70-4940f196d852"

export const getExpirableLink = ({
  liveDuration,
  date,
  dataToEncode,
  prefix,
}) => {
  let finalDate = new Date(moment(date).add(liveDuration, "days")).getTime()
  let link = ""
  let d = { finalDate, ...dataToEncode }
  link = JSON.stringify(d)
  return prefix + encrypt(link)
}

export const getDataFromExpirableToken = l => {
  if (!l) return {}
  let decryptedLink = decrypt(l)
  // console.log("decryptedLink: ", decryptedLink);
  return JSON.parse(decryptedLink)
}

const fallbackCopyTextToClipboard = text => {
  let textArea = document.createElement("textarea")
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    let successful = document.execCommand("copy")
    let msg = successful ? "successful" : "unsuccessful"
    console.log("Fallback: Copying text command was " + msg)
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err)
  }

  document.body.removeChild(textArea)
}
export const copyTextToClipboard = text => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(
    function () {
      // console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      // console.error("Async: Could not copy text: ", err);
    },
  )
}

export const truncate = (str, n) => {
  if (!str) return "-"
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

export const getAddressFromOrder = order => {
  if (!order) return "-"
  const { state, house_number, address_line_1, city, pincode } = order || {}
  return (
    <div>
      <div>{`${house_number}, ${address_line_1}`}</div>
      <div>{`${city}, ${state}, ${pincode}`}</div>
    </div>
  )
}

export const getMaxFormArrayProperty = (arr, propertyKey) => {
  if (!arr) return ""
  let result = Math.max(
    ...arr
      .map(a => a[propertyKey] || 7)
      .sort((a, b) => a > b)
      .reverse(),
  )
  return result
}

export const getDateAfterNDays = (d, n) => {
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate.getTime()
}

export const getMaxDeliveryDate = (products, d = new Date()) => {
  if (!products || products.length === 0) return "NA"
  let n = getMaxFormArrayProperty(products, "deliveryTime")
  return getDateAfterNDays(d, n)
}

export const getRelativeDate = targetDate => {
  const currentDate = new Date()
  let deltaMillis = targetDate - currentDate
  const isFuture = deltaMillis >= 0

  deltaMillis = Math.abs(deltaMillis)

  // Calculate days, months, etc.
  const msPerSecond = 1000
  const msPerMinute = msPerSecond * 60
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const days = Math.floor(deltaMillis / msPerDay)
  const months = Math.floor(days / 30) // Approximation, considering 30 days per month

  console.log("days", days, deltaMillis, msPerDay)

  let result = ""
  if (months > 0) {
    result += `${months} month${months === 1 ? "" : "s"} `
  }
  if (days % 30 > 0) {
    result += `${days % 30} day${days % 30 === 1 ? "" : "s"} `
  }

  if (result === "") {
    return "Today"
  }

  return isFuture ? `In ${result.trim()}` : `${result.trim()} ago`
}

export const getUniqueItems = arr => {
  return [...new Set(arr)]
}

export const isPincodeValid = pincode => {
  if (!pincode || (pincode && (pincode.length > 6 || pincode.length < 6))) {
    return false
  } else {
    return true
  }
}
export const cleanObject = obj => {
  if (!obj) return {}
  let filtered = Object.keys(obj).filter(k => obj[k])
  let temp = {}
  filtered.forEach(k => {
    temp[k] = obj[k]
  })
  return temp
}

export const getArrayFromItem = (arr, startingItem) => {
  const startingIndex = arr.indexOf(startingItem)

  if (startingIndex === -1) {
    // Starting item not found in the array
    return []
  }

  return arr.slice(startingIndex)
}

export const deepCopy = obj => {
  if (obj) {
    obj = JSON.stringify(obj)
    return JSON.parse(obj)
  } else return {}
}

export const getStoreAndProductIdFromCompoundId = compoundId => {
  const storeId = compoundId.slice(0, 20)
  const productId = compoundId.slice(20, compoundId.length)
  console.log(storeId, productId)

  return { storeId, productId }
}

export const isMobileChromeOrFirefox = () => {
  const userAgent = navigator.userAgent
  return (
    /Android.*Chrome\//.test(userAgent) || /Android.*Firefox\//.test(userAgent)
  )
}

export const capitalizeFirstLetter = sentence => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}
