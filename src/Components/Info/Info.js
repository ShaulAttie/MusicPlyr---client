import React from 'react'
import './Info.css'

const Info = ({songInfo}) => {
  // console.log(songInfo);
  return (
    <div className='info'>
      <h2>Music Info</h2>
      <h5>{songInfo.title}</h5>
      <h5><strong>Duration:</strong>{songInfo.duration_formatted}</h5>
      <h5>{songInfo.url}</h5>
    </div>
  )
}

export default Info
