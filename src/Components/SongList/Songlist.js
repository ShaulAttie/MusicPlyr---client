import React, { useContext, useState } from "react";
import "./Songlist.css";
import { APISongContext } from "../../Helpers/APISongContext";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist } from "../../Redux/actions/playlists";


const Songlist = ({ songOnclick }) => {
  const { searchSongs, setSearchSongs } = useContext(APISongContext);

  const user = JSON.parse(localStorage.getItem('profile'))
  // console.log(user?.result);

  const { playlist } = useSelector((state) => state.playlist)
  // console.log(playlist);

  const dispatch = useDispatch();

  const addToPlaylist = (elem) => {
    const { title, url, id, duration, duration_formatted } = elem

    !playlist.songs.find(song => song.id === id) && playlist.songs.push({ title, url, id, duration, duration_formatted })

    dispatch(updatePlaylist(playlist._id, playlist))

  }

  return (
    <div className="song_list" key={Math.random().toString()}>
      <h2>Songlist</h2>
      {searchSongs.map((elem) => {
        return (
          <div className="song" key={Math.random().toString()}>
            <h5 onClick={() => songOnclick(elem)}>{elem.title}</h5>
            <button onClick={() => addToPlaylist(elem)}>➕</button>
          </div>
     
        );
      })}
    </div>
  );
};

export default Songlist;
