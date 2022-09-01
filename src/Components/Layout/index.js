import './Layout.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header'
import Auth from '../Auth'
import SubLayout from '../SubLayout'


const Layout = () => {

    return (
        <div className="layout">
            <Header />
            <Routes>
                <Route path="/" element={<SubLayout />} />
                <Route path="/login" element={<Auth />} />
            </Routes>
        </div>
    )
}

export default Layout