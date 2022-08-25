import React, { useRef } from 'react'
import './Searchbar.css'

const Searchbar = ({ inputOnchangeHandler, searchButtonOnclickHandler }) => {

  const inputRef = useRef()

  const keyPressHandler = (e) =>{
    e.key === 'Enter' && inputRef.current.focus();
  }


  return (
    <div className='searchbar_input'>
      <input onChange={inputOnchangeHandler} onKeyDown={(e)=>keyPressHandler(e)}></input>
      <button onClick={searchButtonOnclickHandler} ref={inputRef}>🔍</button>
    </div>
  )
}

export default Searchbar
