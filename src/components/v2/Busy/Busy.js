import React from "react"
import Loader from "../../Loader"
import "./Busy.css"

export const Busy = ({ children, busy, type }) => {
  return (
    <>
      {type === "my-account" ? (
        <div className='busy-container'>
          {busy && type && (
            <div>
              <Loader type={"my-account"} />
            </div>
          )}
          {children}
        </div>
      ) : (
        <div className='busy-container'>
          {busy && (
            <div className='busy-active'>
              <Loader />
            </div>
          )}
          {children}
        </div>
      )}
    </>
  )
}
