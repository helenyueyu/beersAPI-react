import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

import './App.css';

import Title from './components/Title'
import NameSearch from './components/NameSearch'
import StateSearch from './components/StateSearch'
import Result from './components/Result'

class App extends Component {
  state = {
    name: '',
    state: '',
    perPage: 50,
    data: null
  }
  componentDidMount() {
    fetch(`https://api.openbrewerydb.org/breweries`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data
      }))
      .catch(err => console.log(err))
  }
  handleSwitch = (e) => {
    this.setState({
      perPage: e.target.value
    })
  }
  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleChangeState = (e) => {
    this.setState({
      state: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { name, state, perPage } = this.state
    if (name.length !== 0 && state.length === 0) {
      fetch(`https://api.openbrewerydb.org/breweries?by_name=${name}&per_page=${perPage}`)
        .then(res => res.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(err => console.log(err))
    } else if (name.length === 0 && state.length !== 0) {
      fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=${perPage}`)
        .then(res => res.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(err => console.log(err))
    } else if (name.length !== 0 && state.length !== 0) {
      fetch(`https://api.openbrewerydb.org/breweries?by_name=${name}&by_state=${state}&per_page=${perPage}`)
        .then(res => res.json())
        .then(data => this.setState({
          data: data
        }))
        .catch(err => console.log(err))
    } else {
      this.setState({
        data: [{name:'Need to input either name of the brewery, or the state.' }]
      })
    }
  }
  handleSubmitName = (e) => {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${this.state.name}`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data
      }))
      .catch(err => console.log(err))
  }
  handleSubmitState = (e) => {
    e.preventDefault()
    this.setState({
      state: e.target.value
    })
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${this.state.name}`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data
      }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="ui container">
      <Title />
        <Form onSubmit={this.handleSubmit}>
          <NameSearch
          handleChange={this.handleChangeName}/>
          <StateSearch handleChange={this.handleChangeState}/>
          <Button>Submit</Button>
        </Form>
        <br/>
        <br/>
        <div>
          {this.state.data && this.state.data.map(x => <li key={x.id}>
            <Result
              name={x.name}
              state={x.state}
              street={x.street}
              city={x.city}
              postal={x.postal_code}
              phone={x.phone}
            />
          </li>)}
        </div>
      </div>
    );
  }
}

export default App;
