import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      concerts: [],
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    let val = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: val
    })
  }

  render() {
    let { search } = this.state;
    return (
      <>
        <h1>Concerts?</h1>
        <input type="text" name="search" value={search} onChange={this.handleChange} placeholder="Enter your city here:"/>
      </>
    )
  }
}

export default App;