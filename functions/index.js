const { onDocumentCreated } = require("firebase-functions/v2/firestore")
const { initializeApp } = require("firebase-admin/app")
const { setGlobalOptions } = require("firebase-functions/v2")
require("firebase-functions/logger/compat")

setGlobalOptions({ maxInstances: 10 })

initializeApp()
const env = "production"

const prefix = `${env}/data`
const collection = "flareact"

exports.docCreation = onDocumentCreated(
  `${prefix}/${collection}/{docID}`,
  event => {
    console.log("Document created!", event.params)
  },
)
