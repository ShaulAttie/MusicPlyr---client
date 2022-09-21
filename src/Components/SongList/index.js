import { v4 as uuidv4 } from 'uuid';
import "./Songlist.css";
import React, { useContext, useEffect, useState } from "react";
import { APISongContext } from "../../Helpers/APISongContext";

import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist, getPlaylist, getPlaylistsByCreator } from "../../Redux/actions/playlists";

import { AiOutlinePlusCircle, AiOutlineQuestionCircle } from "react-icons/ai"


const Songlist = ({ songOnclick, showInfo }) => {
  const dispatch = useDispatch();

  const { searchSongs } = useContext(APISongContext);
  // const user = JSON.parse(localStorage.getItem('profile'))

  const { playlists, playlist } = useSelector((state) => state.playlist)


  const addToPlaylist = (elem) => {
    const { title, url, id, duration, duration_formatted } = elem


    !playlist.songs?.find(song => song.id === id) && playlist.songs.push({ title, url, id, duration, duration_formatted })

    dispatch(updatePlaylist(playlist._id, playlist))

  }

  return (
    <div className="song_list">

      {searchSongs?.map((elem) => {
        return (
          <div className="song" key={uuidv4()}>
            <h5 onClick={() => songOnclick(elem)}>{elem.title}</h5>
            <div>
              <AiOutlineQuestionCircle onClick={() => showInfo(elem)} />
              <AiOutlinePlusCircle onClick={() => addToPlaylist(elem)} />
            </div>
          </div>

        );
      })}
    </div>
  );
};

export default Songlist;
