import React from 'react'
import "./Popup.css"

const Popup = ({ trigger, setTrigger, playSong, dragElement }) => {

    function minimize(e) {
        console.dir(e.target.parentNode.parentNode);
    }



    // let newPlaySong = `https://www.youtube.com/embed/` + `${playSong.id}` + `?autoplay=1`
    if(playSong != undefined) {
        var newPlaySong = `https://www.youtube.com/embed/` + `${playSong.id}` + `?autoplay=1&controls=0`
    } 
    // console.log(newPlaySong);
    return (trigger && (

        <div className="popup" draggable="true" onDrag={dragElement}>
            <div className="popup-inner">
                <div className="popup_header">
                    {/* <button onClick={minimize}>➖</button> */}
                    <button onClick={() => setTrigger(false)}>✖️</button>
                </div>
                <iframe height="200"
                    src={newPlaySong}
                    // src="https://www.youtube.com/embed/{playSong.id}"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
        </div>

    ))
}

export default Popup
