import React, { useEffect } from 'react'
import "./Video.css"

import Plyr from 'plyr-react';
import { useSelector } from 'react-redux';

const Video = ({ trigger, setTrigger, playSong, dragElement }) => {

    useEffect(() => {

    }, [])
    // const {playlist} = useSelector((state) => state.playlist)
    console.log(playSong);

    function minimize(e) {
        console.dir(e.target.parentNode.parentNode);
    }



    // let newPlaySong = `https://www.youtube.com/embed/` + `${playSong.id}` + `?autoplay=1`
    if (playSong != undefined) {
        var newPlaySong = `https://www.youtube.com/embed/` + `${playSong.id}` + `?autoplay=1&controls=0`
    }
    // console.log(newPlaySong);
    return (

        <div className="video">
            <h1>VIDEO</h1>
            {/* <div className="video_header"> */}
            {/* <button onClick={minimize}>➖</button> */}
            {/* <button onClick={() => setTrigger(false)}>✖️</button> */}
            {/* </div> */}
            {/* <iframe height="200"
                src={newPlaySong}
                // src="https://www.youtube.com/embed/{playSong.id}"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe> */}
            {/* <Plyr
                source={{
                    type: "video",
                    sources: [{ src: playSong.id, provider: "youtube" }],
                }}
            /> */}
        </div>

    )
}

export default Video
