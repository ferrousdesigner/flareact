import React, { useEffect } from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import "./App.css"
import { AppName } from "./Config"
import DisplayComponents from "./DisplayComponents"
import { useStateValue } from "./StateProvider"
import BigBannerTitle from "./components/AdBanners/BigBannerTitle"
import Alert from "./components/Alert"
import {
  Notifier,
  requestNotificationPermission,
} from "./components/Notifications/Notification"
import PWAinstall from "./components/PWA/PWAinstall"
import { DB, auth } from "./firebaseSetting"
import logo from "./images/Icon.png"
import Policies from "./components/FooterComponents/Policies"
import Terms from "./components/FooterComponents/Terms"
import AboutUs from "./components/FooterComponents/AboutUs"
import PullRefresh from "./PullRefresh"
import ReactTooltip from "react-tooltip"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Nav from "./components/Nav/Nav"
import FlareactHome from "./FlareactHome"

const AppBusyLoader = () => {
  let darkThemed = document.querySelector(".theme-dark")
  let filterColor = "none"
  if (darkThemed) filterColor = "invert(1)"
  return (
    <div className='app-loader'>
      <div>
        <img
          src={logo}
          width={200}
          alt='logo'
          style={{ marginBottom: 10, filter: filterColor }}
        />
        <Loader />
      </div>
    </div>
  )
}

const AuthRoute = props => {
  const [{ user }] = useStateValue()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (user) {
    return <Route {...props} />
  } else {
    localStorage.setItem(AppName + "PathBeforeLogin", window.location.href)
    return <Redirect to='/login' />
  }
}
const PullToRefreshRoute = props => {
  return (
    <PullRefresh>
      {props.auth ? <AuthRoute {...props} /> : <Route {...props} />}
    </PullRefresh>
  )
}

export const getUserMeta = (uid, dispatch) => {
  if (!dispatch || !uid) return
  DB.collection(`users_meta`)
    .doc(uid)
    .get()
    .then(async doc => {
      if (doc.exists) {
        let userMeta = doc.data()
        let storesSnap = await DB.collection(`users_meta`)
          .doc(uid)
          .collection("stores")
          .get()
        let stores = storesSnap.docs.map(doc => doc.data())
        userMeta["stores"] = stores
        // console.log("user meta", userMeta);
        dispatch({
          type: "SET_USER_META",
          userMeta: userMeta,
        })
        dispatch({
          type: "UNSET_BUSY",
        })
      } else {
        dispatch({
          type: "UNSET_BUSY",
        })
      }
    })
    .catch(e => console.error("Error fetching usermeta", e))
}
function App() {
  const [{ appBusy, busyMessage }, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: "SET_BUSY",
    })
    // will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        if (authUser.email) {
          const isSuperAdmin =
            process.env.REACT_APP_ADMIN_EMAIL &&
            process.env.REACT_APP_ADMIN_EMAIL.split(",").includes(
              authUser?.email,
            )
          dispatch({
            type: "SET_SUPER_ADMIN",
            isSuperAdmin: isSuperAdmin,
          })
        }
        if (authUser.phoneNumber) {
          const isSuperAdmin =
            process.env.REACT_APP_ADMIN_PHONE &&
            process.env.REACT_APP_ADMIN_PHONE.split(",").includes(
              authUser?.phoneNumber,
            )
          dispatch({
            type: "SET_SUPER_ADMIN",
            isSuperAdmin: isSuperAdmin,
          })
        }
        console.log("Authenticated user", authUser)
        getUserMeta(authUser.uid, dispatch)
        requestNotificationPermission()
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
        dispatch({
          type: "UNSET_BUSY",
        })
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        })
        dispatch({
          type: "UNSET_BUSY",
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  // React.useEffect(() => window.scrollTo(0, 0));
  return (
    <div>
      {appBusy && <AppBusyLoader message={busyMessage} />}
      <Notifier />
      <Router>
        <div className={appBusy ? "App app-busy" : "App"}>
          <Route component={Nav} />
          <Route component={BigBannerTitle} />
          <Route component={Alert} />
          <Switch>
            <PullToRefreshRoute path='/' component={FlareactHome} />
            <Route path='/components' component={DisplayComponents} />
            <Route path='/about_us' component={AboutUs} />
            <Route path='/policies' component={Policies} />
            <Route path='/terms' component={Terms} />
            <Route path='*' render={() => <Header lg>Page Not Found</Header>} />
          </Switch>
        </div>
      </Router>
      {window.innerWidth < 766 && <PWAinstall type='mobile' />}
      <ReactTooltip />
    </div>
  )
}

export default App
