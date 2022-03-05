import React from "react"
const Notification = ({ msg, isErr }) => {
  let cssClass
  if (!msg) return <div className="empty"> </div>
  isErr ? (cssClass = "error") : (cssClass = "notification")
  return <div className={cssClass}>{msg}</div>
}
export default Notification
