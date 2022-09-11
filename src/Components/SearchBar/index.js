import React, { useRef, useState, useContext, useEffect } from 'react'
import './Searchbar.css'
import axios from 'axios';

import { APISongContext } from "../../Helpers/APISongContext";
import {GiMagnifyingGlass} from "react-icons/gi"

const bandsToSearch = ["jamiroquay", "cafe tacuba", "charlie garcia", "manu chao", "mano negra"]

const Searchbar = () => {
  const [search, setSearch] = useState(bandsToSearch[Math.floor(Math.random()*bandsToSearch.length)]);
  const { setSearchSongs } = useContext(APISongContext);

  const inputRef = useRef()

  useEffect(() => {
    searchOnclickHandler()
  },[])

  function searchOnclickHandler() {
    axios
    .get(`https://musicplyr.onrender.com/api/search/${search}`)
    // .get(`https://musicplyr13.herokuapp.com/api/search/${search}`)
      // .get(`http://localhost:3001/api/search/${search}`)
      // .then((res) => console.log(res.data))
      .then((res) => setSearchSongs(res.data))
      .catch((e) => console.log(e));
  }

  function inputOnchangeHandler(e) {
    e.preventDefault()
    setSearch(e.target.value);
  }

  const keyPressHandler = (e) =>{
    e.key === 'Enter' && inputRef.current.focus();
  }


  return (
    <div className='searchbar_input'>
      <input onChange={inputOnchangeHandler} onKeyDown={(e)=>keyPressHandler(e)}></input>
      <button onClick={searchOnclickHandler} ref={inputRef}><GiMagnifyingGlass /></button>
      
    </div>
  )
}

export default Searchbar
