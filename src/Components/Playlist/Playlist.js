import './Playlist.css'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { createPlaylist, getPlaylistsByCreator, getPlaylist,updatePlaylist, deletePlaylist } from '../../Redux/actions/playlists'


const Playlist = ({ /*playlist,*/ minusButtonOnclick, playlistSongOnclick, songOnclick }) => {
  // const [createNewPlaylist, setCreateNewPlaylist] = useState()
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('profile'))
  // console.log(user?.result._id);

  var { playlists, playlist } = useSelector((state) => state.playlist)
  // console.log(playlist);

  // useEffect(() => {
    
  // }, [])

   useEffect(() => {
    dispatch(getPlaylistsByCreator(user?.result._id))
},[playlists])


  function playOnclick(elem, index) {
    songOnclick(elem)
    playlistSongOnclick(elem, index)
    console.log(elem);
  }

  // const createPlaylistHandler = () => {

  //   dispatch(createPlaylist({ createNewPlaylist }))
  // }

  // const openPlaylist = (elem) => {
  //   // console.log(elem._id);
  //   dispatch(getPlaylist(elem?._id))
  // }

  const removeButton = (elem) => {
    const { id } = elem

    playlist.songs = playlist.songs.filter(song => song.id !== id)

    // console.log(playlist._id,playlist);

    dispatch(updatePlaylist(playlist._id, playlist))

  }

  const delPlaylist =(e) =>{
    // console.log(playlist._id);
    // console.log(playlists);

    dispatch(deletePlaylist(playlist._id))

  }


  return (

    <div className='play_list' >
      <h2>Playlist</h2>
      {/* <div>
        <input className='createPlaylist' onChange={(e) => setCreateNewPlaylist(e.target.value)} />
        <button onClick={createPlaylistHandler}>Create Playlist</button>
      </div> */}
      {/* <div>
        {user && playlists?.map((elem) => <h5 onClick={() => openPlaylist(elem)}>{elem.name}</h5>)}
      </div> */}
      {(user && playlist) &&
        playlist?.songs?.map((elem, index) => {
          return <>
            <div className='playlist_song'>
              <h5 onClick={() => playOnclick(elem, index)}>{elem.title}</h5>
              <button onClick={() => removeButton(elem)}>➖</button>
            </div>
          </>
        })}
        <div className="del_playlist">
        <button  onClick={delPlaylist}>Delete Playlist</button>
        </div>
    </div>

  )
}

export default Playlist
