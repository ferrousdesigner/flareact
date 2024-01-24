import React from 'react'
const EllipsisText = ({ lines, text }) => {
  const styles = {
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
  }

  return <div style={styles}>{text}</div>
}

export default EllipsisText
