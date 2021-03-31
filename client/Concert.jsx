import React from 'react';

class Concert extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      clicked: false
    }
    this.clicker = this.clicker.bind(this);
  }

  clicker() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render(){
    let { concert } = this.props
    let venue;
    debugger;
    for (let x = 0; x< concert.entities.length; x++ ) {
      let entity = concert.entities[x]
      console.log(entity)
      if (entity.type && entity.type === 'venue') {
        venue = entity
        break
      }
    }

    if (venue) {
      const { save, index } = this.props
      return(
        <div onClick={this.clicker}>
          <h6>{concert.title}</h6>
          {this.state.clicked &&
            <>
              <div>----------------------------------------------------------------------------------------------</div>
              <div>Address:{venue.formatted_address}</div><br />
              <div>Name:{venue.name}</div><br />
              <button onClick={ (e) => {save(e, index)} }>Save</button>
              <div>----------------------------------------------------------------------------------------------</div>
            </>
          }
        </div>
      )
    }
    return null
  }
}

export default Concert;