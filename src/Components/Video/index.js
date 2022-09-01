import React, { useEffect, useRef, useState } from 'react'
import "./Video.css"

import { useSelector } from 'react-redux';

import ReactPlayer from 'react-player'

import {
  BsPlayCircle,
  BsPauseCircle,
  BsVolumeMute,
  BsVolumeDown,
  BsVolumeUp,
  BsSkipForwardCircle,
  BsShuffle,
  BsFullscreen
} from "react-icons/bs"
import { green } from '@mui/material/colors';
import Popup from '../Popup';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';


const Video = ({ playSong, showInfo }) => {
  const myBarRef = useRef()
  const secRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isTrigger, setIsTrigger] = useState(false)
  const [sec, setSec] = useState(false)


  const [rangeValue, setRangeValue] = useState(1)

  const [nowIsPlaying, setNowIsPlaying] = useState()

  const { playlist } = useSelector((state) => state.playlist)


  var width = 0
  var second = 0
  var interval
  var secs

  // console.log("NowIsPlaying", nowIsPlaying);

  useEffect(() => {
    setNowIsPlaying(playSong)
  }, [playSong])




  const endTime = playSong[0]?.duration - 10

  if (nowIsPlaying !== undefined) {
    var newPlaySong = `https://www.youtube.com/embed/${nowIsPlaying[0]?.id}?end=${endTime}&controls=0`
    // var newPlaySong = `https://www.youtube.com/embed/${playSong[0]?.id}?controls=2&end=${endTime}&autoplay=0&rel=0&enablejsapi=1&origin=${window.location}&showinfo=1`
  }
  // rel=0&enablejsapi=1&

  ///////////////////////////////////////////////////////
  //PLAYER FUNCTIONS//
  var index
  const nextSong = () => {
    // width = 0

    setIsPlaying(true)

    if (!isShuffle) {
      (nowIsPlaying[1] < playlist.songs.length - 1) ? index = nowIsPlaying[1] + 1 : index = 0
      // setNowIsPlaying([playlist.songs[index], index]);
    } else {
      index = Math.floor(Math.random() * (playlist.songs.length))
    }
    setNowIsPlaying([playlist.songs[index], index])
  }

  const endedFn = () => {
    console.log("emded");
    nextSong()
  }

  const pause = () => {
    console.log("paused");
    // clearInterval(interval);
    // clearInterval(secs);
  }

  function musicProgress(data) {

    const element = myBarRef.current;
    const timeElem = secRef.current

    interval = setInterval(frame, nowIsPlaying[0]?.duration / 100);
    secs = setInterval(seconds, 1000);

    function frame() {
      if (width === 100) {
        clearInterval(interval);
      } else {
        width++
        element.style.width = width + '%';
      }
    }
    function seconds() {
      if (second === nowIsPlaying[0]?.duration / 1000) {
        clearInterval(secs);
      } else {
        second++
        const min = (second / 60).toString().split(".")[0]
        const sec = second - (min * 60)
        if (min > 59) {
          const h = (min / 60).toString().split(".")[0]
          timeElem.innerText = `${h}:${min}:${sec}`
        }
        if (sec < 60) {
          timeElem.innerText = `${min}:${sec}`
        }
        if (sec < 10) {
          timeElem.innerText = `${min}:0${sec}`
        }
      }
    }
  }

  const handleWatchProgress = (state) => {
    console.log(state);
  }

  return (


    <>
      <div className="video_item">

        <ReactPlayer

          url={newPlaySong}
          playing={isPlaying}
          volume={rangeValue}
          muted={isMuted}
          controls={true}
          width="100%"
          height="100%"
          pip={true}

          onReady={() => showInfo(nowIsPlaying[0])}
          // onStart={() => console.log("Start")}
          // onPlay={() => musicProgress()}
          // onPause={() => pause("paused")}
          // onDuration={(dur) => progress(dur)}
          onEnded={() => endedFn("Ended")}
          // onSeek={(time)=>console.log("Seek",time)}
          onSeek={handleWatchProgress} // why is this not working
        />
        {/* <div className="video_mask"></div> */}
      </div>
      {/* // Todo - player controls - check why CORS Policy dont allow some functions - full screen doesnt work*/}
      {/* <div className='play_controls'>
        <div className='play_song_title'>
          {nowIsPlaying === undefined ? <span>Play Song Title</span> : <span>{nowIsPlaying[0]?.title}</span>}
        </div>
        <div className='play_buttons'>
          <span onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}</span>

          <span onClick={nextSong}><BsSkipForwardCircle /></span>

          <input type="range" className='slider' name="volume" id="range_vol" min="0" max="1" step="0.01" onChange={(e) => setRangeValue(e.target.value)} /><div className='rangeValue'>{rangeValue}</div>

          <span onClick={() => setIsMuted(!isMuted)}>{isMuted ? <BsVolumeMute /> : <BsVolumeUp />}</span> */}
      {/* <input type="range" className="musicProgress" min="0" max={nowIsPlaying && nowIsPlaying[0]?.duration} value={count} step='1'/>{nowIsPlaying && nowIsPlaying[0]?.duration / 1000} */}

      {/* <div id="myProgress">
            <div id="myBar" ref={myBarRef}></div>
          </div>
          <div className="progress_time"><div ref={secRef}>0:00</div>/{nowIsPlaying ? nowIsPlaying[0]?.duration_formatted : <span>0:00</span>}</div>

          <span onClick={() => setIsShuffle(!isShuffle)} style={isShuffle ? { color: "green" } : { color: "red" }}><BsShuffle /></span> */}
      {/* <span onClick={() => setIsTrigger(!isTrigger)}><BsFullscreen /></span> */}
      {/* </div> */}
      {isTrigger && <Popup playSong={nowIsPlaying} />}
      {/* </div> */}

    </>
  )
}

export default Video

{/* <iframe
  id='myIframe'
  src={newPlaySong}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;encrypted-media"
  allowFullScreen
  ref={iframeRef}
  onCutCapture={() => test()}
  onLoad={() => load()}
>
</iframe> */}