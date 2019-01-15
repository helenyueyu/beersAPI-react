import React from 'react'

const NameSearch = (props) => {
  return (
    <div>
      Name: <input type="text" onChange={props.handleChange}/>
    </div>
  )
}

export default NameSearch
