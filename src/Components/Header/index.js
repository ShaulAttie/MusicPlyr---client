import "./Header.css";
import "../style.scss"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { LOGOUT } from "../../Redux/constants/constantsTypes"

import decode from "jwt-decode"

import Searchbar from "../SearchBar";

import { IoMdLogIn } from "react-icons/io"
import { IoMdLogOut } from "react-icons/io"

const Header = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

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
    setUser(null)
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="header_content">
        <div className="header_light"></div>
        <div className="header_logo">
          <h1 onClick={() => navigate("/")}>MusicPlyr</h1>
        </div>
        {user ? (
          <div className="header__logOut">
            <span>Wellcome, {user.result.name}</span>
            <IoMdLogOut onClick={logout} className="log_button" />
          </div>
        ) : (
          <div className="header__logIn">
            <IoMdLogIn className="log_button" onClick={() => navigate("/login")} />
          </div>
        )}
        <Searchbar />
      </div>
    </div>
  );
};

export default Header;
