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
    for (let x = 0; x< concert.entities.length; x++ ) {
      let entity = concert.entities[x]
      console.log(entity)
      if (entity.type && entity.type === 'venue') {
        venue = entity
        break
      }
    }

    if (venue) {
      const { save, index, remove } = this.props
      const openMap = () => {
        let address = venue.formatted_address.split('\n').join(' ')
        const url = `https://www.google.com/maps/search/${address}`
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
      return(
        <div onClick={this.clicker}>
          <h4>{concert.title}</h4>
          {this.state.clicked &&
            <>
              <span>Address: {venue.formatted_address}  </span>
              <button onClick={openMap}>Directions</button><br /><br />
              <div>At: {venue.name}</div><br />
              <div>Date: {concert.start.substring(0,10)}</div><br />
              {save ?
                <button onClick={ (e) => {save(e, index)} }>Save</button> :
                <button onClick={ (e) => {remove(e, index)} }>Delete</button> }
            </>
          }
        </div>
      )
    }
    return null
  }
}

export default Concert;