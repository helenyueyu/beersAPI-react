import React from 'react'

const StateSearch = (props) => {
  return (
    <div>
      State: <input type="text" onChange={props.handleChange}/>
    </div>
  )
}

export default StateSearch
