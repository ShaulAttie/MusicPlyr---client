import "./Popup.css"
import React from 'react'
import Video from '../Video'

const Popup = ({playSong}) => {
    return (
        <div className="popup">
            <Video playSong={playSong}/>
        </div>
    )
}

export default Popup
