import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { APISongContext } from "./Helpers/APISongContext";

const App = () => {
  const [searchSongs, setSearchSongs] = useState([]);

  return (
    <div>
      <APISongContext.Provider value={{ searchSongs, setSearchSongs }}>
        <BrowserRouter>
        <Layout />
        </BrowserRouter>
      </APISongContext.Provider>
    </div>
  );
};

export default App;
