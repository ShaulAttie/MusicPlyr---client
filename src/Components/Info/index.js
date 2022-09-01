import React from 'react'
import './Info.css'
import "../style.scss"

const Info = ({ songInfo }) => {

  return (
    <div className='info'>
      <div className="info__light">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2>Music Info</h2>
      {songInfo && <>
        <h5>&nbsp;&nbsp;{songInfo?.title}</h5>
        <h5>&nbsp;&nbsp;<strong>Duration:</strong>{songInfo?.duration_formatted}</h5>
      </>
      }
    </div>
  )
}

export default Info
