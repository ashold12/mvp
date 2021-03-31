import React from 'react'
import Concert from './Concert'

const ConcertList = ({ concerts, save }) =>
<div>
  { concerts.map((entry, index) => <Concert concert={entry} index={index} save={save}/>)}
</div>

export default ConcertList