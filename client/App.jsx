import React from 'react'
import handler from './handler.js'
import ConcertList from './ConcertList'
import SavedList from './SavedList'
import example from './example.js'
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
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount(){
    let today = new Date().toISOString().substring(0,10)
    let saved = ls.get('saved') || []
    this.setState({ saved: saved })
    saved.forEach((entry) => {
      let date = entry.start.substring(0,10)
      if (date === today) {
        alert(`${entry.title} is TODAY!!!`);
      }
    });
  }

  remove(e, index) {
    if(e) e.preventDefault()
    const { saved } = this.state
    let newSaved = saved
    newSaved.splice(index, 1)
    this.setState(
      { saved: newSaved },
      () => { ls('saved', this.state.saved) });
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
    if (city === 'dev') {
      this.setState({
        concerts: example
      })
      return
    }
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
    let { city, state, concerts, saved } = this.state;
    return (
      <>
        <h1>Concerts?</h1>
        <div className="search-concerts">
          <input type="text" name="city" value={city} onChange={this.handleChange} placeholder="Enter your city here:"/>
          <input type="text" name="state" value={state} onChange={this.handleChange} placeholder="Enter your state here:"/>
          <button onClick={this.handleSubmit}>Search</button>
        </div>
        <div className="concert-parent">
          <ConcertList concerts={concerts} save={this.save}/>
          <SavedList saved={saved} remove={this.remove}/>
        </div>
      </>
    )
  }
}

export default App;