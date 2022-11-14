import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import Home from "../routes/Home.jsx";
import Settings from "../routes/Settings.jsx";
import Sessions from "../routes/Sessions.jsx";
import ErrorPage from "../error-page.jsx";

const host = 'http://localhost:3000';

const App = () => {
  const [location, setLocation] = useState({});
  const [subregions, setSubregions] = useState([]);

  const getSubregions = () => {
    const config = {
      params: {
        id: location.region.id
      }
    };
    axios.get(`${host}/api/subregions`, config)
    .then((res) => {
      console.log('Got the subregions', res.data);
      setSubregions(res.data);
    })
    .catch(e => console.error(e));
  }


  useEffect(() => {
    if (Object.keys(location).length > 0) {
      getSubregions();
    }
  }, [location]);

  return (
    <>
      <h1>Waave</h1>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage/>}/>
        <Route path="settings" element={<Settings setLocation={setLocation}/>} />
        <Route path="sessions" element={<Sessions subregions={subregions}/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
  )
};

export default App;