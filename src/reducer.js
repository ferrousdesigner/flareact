import { removeDuplicate } from "./GeneralFunctions"

export const initialState = {
  user: null,
  appBusy: false,
  alert: null,
  firebaseLastRow: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_META":
      return {
        ...state,
        userMeta: action.userMeta,
      }
    case "SET_FIRESTORE_LAST":
      return {
        ...state,
        firebaseLastRow: {
          ...state.firebaseLastRow,
          ...action.firebaseLastRow,
        },
      }
    case "SET_TABLE_ROWS":
      return {
        ...state,
        storeProducts: state.storeProducts
          ? removeDuplicate(
              [...state.storeProducts, ...action.storeProducts],
              "id",
            )
          : action.storeProducts,
      }
    case "COLLECTION_RENDERER_SET":
      let oldRows = state[action.reducerVar] || []
      let newRows =
        oldRows && oldRows.length > 0
          ? removeDuplicate([...oldRows, ...action[action.reducerVar]], "id")
          : action[action.reducerVar]
      let newData = {}
      // console.log("COLLECTION_RENDERER_SET", action);
      newData[action.reducerVar] = newRows
      return { ...state, ...newData }
    case "COLLECTION_RENDERER_REPLACE":
      let temp = {}
      // console.log("COLLECTION_RENDERER_SET", action);
      temp[action.reducerVar] = action.newRows
      return { ...state, ...temp }

    case "CLEAR":
      let tempState = { ...state }
      tempState[action.clearVar] = []
      tempState.firebaseLastRow[action.clearVar] = null
      // console.log('tempState', state)
      return {
        ...tempState,
      }
    case "SET_BUSY":
      return {
        ...state,
        appBusy: true,
        busyMessage: action.message,
      }
    case "UNSET_BUSY":
      return {
        ...state,
        appBusy: false,
        busyMessage: null,
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        userMeta: action.user ? state.userMeta : {},
      }
    case "FETCH_ENTITIES":
      let entities = state["entities"] || {}
      entities[action.reducerVar] = action.data
      return { ...state, entities }
    case "SHOW_ALERT":
      return {
        ...state,
        alert: { ...action },
      }
    case "HIDE_ALERT":
      return {
        ...state,
        alert: null,
      }
    case "UPDATE_PWA_PROMPTS":
      return {
        ...state,
        hidePWAWarning: { ...state.hidePWAWarning, ...action.hidePWAWarning },
      }
    case "SET_SUPER_ADMIN":
      return {
        ...state,
        isSuperAdmin: action?.isSuperAdmin,
      }
    case "GENERAL":
      return {
        ...state,
        ...action?.data,
      }
    default:
      return state
  }
}

export default reducer
