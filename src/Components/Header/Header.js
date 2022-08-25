import "./Header.css";
import axios from "axios";
import react, { useContext, useState, useEffect } from "react";

import Searchbar from "../SearchBar/Searchbar";

import { APISongContext } from "../../Helpers/APISongContext";

import { Link, useLocation, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { createPlaylist, getPlaylistsByCreator, getPlaylist, updatePlaylist } from '../../Redux/actions/playlists'


import { LOGOUT } from "../../Redux/constants/constantsTypes"

import decode from "jwt-decode"

import { IoMdLogIn } from "react-icons/io"
import { IoMdLogOut } from "react-icons/io"
import Playlist from "../Playlist/Playlist";



const Header = () => {

  const [search, setSearch] = useState("");
  const [createNewPlaylist, setCreateNewPlaylist] = useState()
  const [selected, setSelected] = useState("")
  var { playlists , playlist} = useSelector((state) => state.playlist)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const { searchSongs, setSearchSongs } = useContext(APISongContext);

  useEffect(() => {
    dispatch(getPlaylistsByCreator(user?.result._id))

    const result = playlists?.filter(elem => elem.name === selected)

    // console.log(selected);
    result && dispatch(getPlaylist(result[0]?._id))
  }, [user])

  function searchButtonOnclickHandler() {
    // console.log(search);
    axios
      .get(`http://localhost:3001/api/search/${search}`)
      // .then((res) => console.log(res.data))
      .then((res) => setSearchSongs(res.data))
      .catch((e) => console.log(e));
  }

  function inputOnchangeHandler(e) {
    setSearch(e.target.value);
  }

  //////////////////////////////////////////


  // console.log(user);

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))

  }, [location])


  const logout = () => {
    dispatch({ type: LOGOUT })
    // setUser(null)
    // window.location.reload()
    navigate("/songlist")
  }

  const createPlaylistHandler = () => {
    // console.log(createNewPlaylist);
    dispatch(createPlaylist({ createNewPlaylist }))
  }

  const openPlaylist = (e) => {
    e.preventDefault()
    setSelected(e.target.value)
    // console.log(e.target.value);
    const result = playlists.filter(elem => elem.name === e.target.value)
    // console.log(result);
    dispatch(getPlaylist(result[0]?._id))
  }

 
  return (
    <div className="header">
      <div className="header_content">
        <div className="header_newPlaylist">
          {user &&
            <>
              <input className='createPlaylist' onChange={(e) => setCreateNewPlaylist(e.target.value)} />
              <button onClick={createPlaylistHandler}>Create Playlist</button>
            </>
          }
        </div>
        <div className="header_myPlays">
          {user &&
            <>
              <label>My Playlists</label>
              <select name="playlists" id="plays" onChange={openPlaylist} key="123">
                {user && playlists?.map((elem) => 
                <option value={elem.name} key={elem.id}>{elem.name}</option>)}
              </select>
            </>
          }
        </div>

        <div className="header_logo">
          <h1>My Playlist</h1>
        </div>
        {
          user ? (
            <div className="header__logOut">
              <span>Wellcome, {user.result.name}</span>
              <button onClick={logout} className="log_button"><IoMdLogOut /></button>
            </div>
          ) : (
            <div className="header__logIn">
              <Link to="/login"><button className="log_button"><IoMdLogIn /></button></Link>
            </div>
          )
        }

        <Searchbar
          searchButtonOnclickHandler={searchButtonOnclickHandler}
          inputOnchangeHandler={inputOnchangeHandler}
        />
      </div>
    </div>
  );
};

export default Header;
