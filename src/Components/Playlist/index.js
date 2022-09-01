import { v4 as uuidv4 } from 'uuid';

import './Playlist.css'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { getPlaylistsByCreator, updatePlaylist, deletePlaylist } from '../../Redux/actions/playlists'
import { AiOutlineMinusCircle,AiOutlineQuestionCircle } from "react-icons/ai"

const Playlist = ({ songOnclick, showInfo }) => {
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('profile'))

  var { playlist } = useSelector((state) => state.playlist)
  // console.log("PLAYLIST", playlist);

  // useEffect(() => {

  //   dispatch(getPlaylistsByCreator(user?.result._id))

  // }, [])


  const removeButton = (elem) => {
    const { id } = elem

    playlist.songs = playlist.songs.filter(song => song.id !== id)

    dispatch(updatePlaylist(playlist._id, playlist))

  }


  return (

    <div className='play_list' >
      {(user && playlist) &&
        playlist?.songs?.map((elem, index) => {
          return (
            <div className='playlist_song' key={uuidv4()}>
              <h5 onClick={() => songOnclick(elem, index)} key={uuidv4()}>{elem.title}</h5>
              <div>
                <AiOutlineQuestionCircle onClick={() => showInfo(elem)} />
                <AiOutlineMinusCircle onClick={() => removeButton(elem)} />
              </div>
            </div>
          )
        })}

    </div>

  )
}

export default Playlist
