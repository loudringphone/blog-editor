import React from 'react'

export const Helmet = (props) => {

    document.title = props.title + " - Winston's Blog"
  return (
    <div>{props.children}</div>
  )
}
