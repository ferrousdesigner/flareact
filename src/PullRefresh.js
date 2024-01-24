import React from "react"
import PullToRefresh from "react-simple-pull-to-refresh"
import Space from "./components/Space"
import Header from "./components/Header"
import Loader from "./components/Loader"

const refreshPage = () => window.location.reload()
const PullingContent = () => (
  <div style={{ textAlign: "center" }}>
    <Space md />
    <Header center md bold>
      Pull to refresh
    </Header>
    <span className='fas fa-chevron-down' />
  </div>
)
const Refreshing = () => (
  <div style={{ textAlign: "center" }}>
    <Space md />
    <Header center md bold>
      Refreshing...
    </Header>
    <Loader />
  </div>
)
export default function PullRefresh({ children }) {
  return (
    <div>
      {" "}
      <PullToRefresh
        onRefresh={refreshPage}
        pullingContent={<PullingContent />}
        refreshingContent={<Refreshing />}
      >
        {children}
      </PullToRefresh>
    </div>
  )
}
