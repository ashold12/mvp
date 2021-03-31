import React from 'react'
import Concert from './Concert'

const SavedList = ({ saved, remove }) => {
  return (
    <div>
      <h3>Interested</h3>
      { saved.map((concert, index) => <Concert concert={concert} remove={remove} index={index}/>) }
    </div>
  )
}

export default SavedList