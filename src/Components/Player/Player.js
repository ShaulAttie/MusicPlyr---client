import React from 'react'
import './Player.css'


// import Plyr from "plyr-react";
// import "plyr-react/dist/plyr.css";


const Player = ({ setTrigger, playSong, playOnclickButton, nextOnclickButton, shuffleOnclickButton }) => {

  // function playOnclickButton() {
  //   setTrigger(true)
  // }

  return (
    <div className='play_buttons'>
      {/* <Plyr source={videoSrc} /> */}
      <div className='play_song_title'>
        {playSong == undefined ? <span>Play Song Title</span> : <span>{playSong.title}</span>
        }
      </div>
      <div className='play_song_buttons'>
        <button onClick={playOnclickButton}>▶️</button>
        <button onClick={nextOnclickButton}>⏭️</button>
        <button onClick={shuffleOnclickButton}>🔀</button>
        {/* <button onClick={loopOnclickButton}>🔁</button> */}
      </div>
    </div>
  )
}

export default Player
