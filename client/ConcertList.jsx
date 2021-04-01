import React from 'react'
import Concert from './Concert'

const ConcertList = ({ concerts, save }) =>
<div className="searched-concerts">
  <h3>Search Results</h3>
  { concerts.map((entry, index) => <Concert concert={entry} index={index} save={save}/>)}
</div>

export default ConcertList