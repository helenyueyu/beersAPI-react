import React from 'react'
import { Card, Header } from 'semantic-ui-react'

const Result = (props) => {
  return (
    <Card fluid style={{padding: '2rem'}}>
      <Header>{props.name}</Header>
      <p><b>State: </b>{props.state}</p>
      <p><b>Post Code: </b>{props.postal}</p>
      <p><b>Location: </b>{props.street}, {props.city}</p>
      <p><b>Phone: </b>{props.phone}</p>
    </Card>
  )
}

export default Result
