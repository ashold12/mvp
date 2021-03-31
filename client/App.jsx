import React from 'react'
import handler from './handler.js'
import ConcertList from './ConcertList'
import ls from 'local-storage'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      concerts: [],
      saved: [],
      city: '',
      state: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.save = this.save.bind(this)
  }

  componentDidMount(){
    this.setState({
      saved: ls.get('saved') || []
    })
  }

  save(e, index) {
    if (e) e.preventDefault()
    this.setState(
      { saved: [...this.state.saved, this.state.concerts[index]] },
      () => { ls('saved', this.state.saved) });
  }

  clearFields() {
    this.setState({
      city: '',
      state: '',
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    let { city, state } = this.state;
    if (!city || !state) return
    handler.getEvents(city, state, ({ data }) => {
      this.clearFields()
      this.setState({
        concerts: data
      })
    });
  }

  handleChange (e) {
    let val = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: val
    })
  }

  render() {
    let { city, state, concerts } = this.state;
    return (
      <>
        <h1>Concerts?</h1>
        <input type="text" name="city" value={city} onChange={this.handleChange} placeholder="Enter your city here:"/>
        <input type="text" name="state" value={state} onChange={this.handleChange} placeholder="Enter your state here:"/>
        <button onClick={this.handleSubmit}>Search</button>
        <ConcertList concerts={concerts} save={this.save}/>
      </>
    )
  }
}

export default App;