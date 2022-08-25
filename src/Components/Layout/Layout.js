import './Layout.css'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Info from '../Info/Info'
import Main from '../Main'
import Video from '../Video/Video'
import Auth from '../Auth/Auth'

// import Player from '../Player/Player'
// import Songlist from '../Songlist/Songlist'
// import Playlist from '../Playlist/Playlist'
// import Popup from '../Popup/Popup'


const Layout = () => {

    const [playlist, setPlaylist] = useState([])
    const [info, setInfo] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [playSongNow, setPlaySongNow] = useState("")
    const [index, setIndex] = useState(0)

    function songOnclickHandler(elem) {
        console.log('songOnclickHandler');
        setInfo(elem)
    }

    function playlistSongOnclick(e) {
        console.log(e);
        setPlaySongNow(e)
    }


    // function playOnclickButton() {
    //     if (playlist.length == 0) return
    //     setTrigger(true)
    //     setPlaySongNow(playlist[index])
    //     // console.log(playlist[index]);
    //     if (shuffle) {
    //         setShuffle(false)
    //     }
    //     // setTimeout(
    //     //     nextOnclickButton
    //     //     , (playlist[index].duration));
    // }

    // function nextOnclickButton() {
    //     // console.log(playlist[index])

    //     if (playlist.length == 0) return
    //     setTrigger(true)
    //     if (!shuffle) {
    //         if (index + 1 == playlist.length) {
    //             setIndex(0)
    //             setPlaySongNow(playlist[0])
    //             playOnclickButton()
    //         } else {
    //             setIndex(index + 1)
    //             setPlaySongNow(playlist[index + 1])
    //             playOnclickButton()
    //         }
    //     } else {
    //         let index00 = playlist[Math.floor(Math.random() * (playlist.length))]
    //         setPlaySongNow(index00)
    //         playOnclickButton()
    //     }
    // }

    // function shuffleOnclickButton() {
    //     if (playlist.length == 0) return

    //     setTrigger(true)
    //     shuffle == false ? setShuffle(true) : setShuffle(false)
    //     setPlaySongNow(playlist[Math.floor(Math.random() * (playlist.length))])

    // }

    return (
        <div>
            <Header />
            <div className='main'>
                <Main
                    playlist={playlist}
                    songOnclick={songOnclickHandler}
                    playlistSongOnclick={playlistSongOnclick}
                />

                <div className='play_info'>
                    {/* <Playlist playlist={playlist} minusButtonOnclick={minusButtonHandler} playlistSongOnclick={playlistSongOnclick} /> */}
                    <Routes>
                        <Route path='/'></Route>
                        <Route path={"/songlist"} element={<Video playSong={playSongNow} />} />
                        <Route path={"/playlist"} element={<Video playSong={playSongNow} />} />
                        <Route path='/login' element={<Auth />} />
                    </Routes>
                    {/* <Player setTrigger={setTrigger} playSong={playSongNow} playOnclickButton={playOnclickButton} nextOnclickButton={nextOnclickButton} shuffleOnclickButton={shuffleOnclickButton} /> */}
                    <Info songInfo={info} />
                </div>
            </div>
            {/* <Popup trigger={trigger} setTrigger={setTrigger} playSong={playSongNow} dragElement={dragElement} /> */}
        </div>
    )
}

export default Layout


// para corrigir as mudancas 
// apagar linha e componente Main
// descomentar Songlist e Playlist