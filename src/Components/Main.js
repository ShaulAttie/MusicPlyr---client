import React from 'react'
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";

import Songlist from './SongList/Songlist';
import Playlist from './Playlist/Playlist';


const Main = ({ songOnclick, playlistSongOnclick }) => {
    // console.log(playlist);
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user);
    return (
        <div className='router'>
            <nav className="nav">
                <Link to={`/songlist`} key={Math.random().toString()}>Songlist</Link>
                {user &&
                    <Link to={`/playlist`} key={Math.random().toString()}>Playlist</Link>
                }
            </nav>

            <Routes>
                <Route path="/songlist" element={<Songlist songOnclick={songOnclick} />} />
                <Route path="/playlist" element={<Playlist  playlistSongOnclick={playlistSongOnclick} songOnclick={songOnclick} />} />
            </Routes>
        </div>
    )
}

export default Main
