import { v4 as uuidv4 } from 'uuid';
import "./SubLayout.css"
import React, { useEffect, useState } from 'react'

import Playlist from '../Playlist'
import Songlist from '../SongList'
import Video from '../Video'
import Info from '../Info'

import { IoIosArrowDropdown } from "react-icons/io"
import { AiOutlineMinusCircle } from "react-icons/ai"

import { useDispatch, useSelector } from "react-redux"
import { createPlaylist, getPlaylistsByCreator, getPlaylist, deletePlaylist } from '../../Redux/actions/playlists'



const SubLayout = () => {
    const [isSonglist, setIsSonglist] = useState(true)
    const [playSongNow, setPlaySongNow] = useState([])
    const [isDrop, setIsDrop] = useState(false)
    const [info, setInfo] = useState()
    const [choosenPlaylist, setChoosenPlaylist] = useState("add to...")

    const { playlist, playlists } = useSelector((state) => state.playlist)

    useEffect(() => {
        // console.log("sublayout useEffect");
        dispatch(getPlaylistsByCreator(user?.result._id))
    }, [])

    //////////////////////////////////////////////////////////

    const user = JSON.parse(localStorage.getItem('profile'))
    const [createNewPlaylist, setCreateNewPlaylist] = useState()
    const dispatch = useDispatch()

    // console.log(playlists);
    // console.log(playlist);
    // console.log(playId);

    //////////////////////////////////////////////////

    const choosePlaylist = (e) => {
        e.preventDefault()
        setChoosenPlaylist(e.target.value)
        const result = playlists.filter(elem => elem.name === e.target.value)

        console.log(result);
        result && dispatch(getPlaylist(result[0]?._id))
    }


    ///////////////////////////////////////////////////

    const createPlaylistHandler = () => {
        dispatch(createPlaylist({ createNewPlaylist }))
        setIsDrop(!isDrop)
    }

    const delPlaylist = (_id) => {
        // console.log(_id);
        dispatch(deletePlaylist(_id))
        setIsDrop(!isDrop)
    }

    const dropFn = () => {
        setIsDrop(!isDrop)
        // console.log(user?.result._id);
        dispatch(getPlaylistsByCreator(user?.result._id))
    }

    const openPlaylist = (e) => {
        e.preventDefault()

        const result = playlists.filter(elem => elem.name === e.target.textContent)

        dispatch(getPlaylist(result[0]?._id))
    }


    /////////////////////////////////////////////////////////
    function songOnclick(elem, index) {
        setPlaySongNow([elem, index])
    }

    /////////////////////////////////////////////////////////
    // useEffect(() => {
    //     playOnclickButton()
    // }, [playSongNow])

    function showInfo(elem) {
        setInfo(elem)
    }
    return (

        <div className='main'>
            <div className='search_play'>
                {(user) ? (
                    isSonglist
                        ? <>
                            <div className="title">
                                <div className="songlist_myPlays">
                                    {/* <form> */}
                                    <label>Add To Playlist:</label>
                                    <select name="playlists" id="plays" value={choosenPlaylist} onChange={choosePlaylist} key={uuidv4()}>
                                        <option >add to ...</option>
                                        {playlists?.map((elem) =>
                                            <option value={elem.name} key={uuidv4()}>{elem.name}</option>)}
                                    </select>
                                    {/* </form> */}
                                </div>
                                <span onClick={() => setIsSonglist(!isSonglist)}>to My Playlists</span></div>
                            <hr style={{ width: "90%" }} />
                            <Songlist songOnclick={songOnclick} showInfo={showInfo} />
                        </>
                        : <>
                            <div className="title"><IoIosArrowDropdown onClick={dropFn} /><h1>{playlist.name}</h1><span onClick={() => setIsSonglist(!isSonglist)}>to My Search</span></div>
                            <hr style={{ width: "90%" }} />

                            <Playlist songOnclick={songOnclick} showInfo={showInfo} />


                            {/* /////////// DropList */}
                            <div className={!isDrop ? "drop_play" : "drop_play change"}>
                                <div className="createPlaylist">
                                    <input onChange={(e) => setCreateNewPlaylist(e.target.value)} />
                                    <button onClick={createPlaylistHandler}>Create Playlist</button>
                                    <h5>My Playlists</h5>
                                </div>
                                <div className="playlist_drop">

                                    {playlists?.map((elem) =>
                                        <div className="playlist_drop_line" key={uuidv4()}>
                                            <span onClick={openPlaylist} value={elem.name} >{elem.name}</span>
                                            <AiOutlineMinusCircle onClick={() => delPlaylist(elem._id)} />

                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                ) :
                    <Songlist songOnclick={songOnclick} showInfo={showInfo} />
                }

            </div>

            <div className='play_info'>
                <Video playSong={playSongNow} showInfo={showInfo} />

                <Info songInfo={info} />

            </div>
        </div>

    )
}

export default SubLayout
