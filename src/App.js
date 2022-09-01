import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import { APISongContext } from "./Helpers/APISongContext";

const App = () => {
  const [searchSongs, setSearchSongs] = useState([]);

  return (
    
      <APISongContext.Provider value={{ searchSongs, setSearchSongs }}>
        <BrowserRouter>
        <Layout />
        </BrowserRouter>
      </APISongContext.Provider>
    
  );
};

export default App;
