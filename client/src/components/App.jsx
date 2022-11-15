import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "../routes/Home.jsx";
import Settings from "../routes/Settings.jsx";
import Sessions from "../routes/Sessions.jsx";
import ErrorPage from "../error-page.jsx";

const host = 'http://localhost:3000';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '3',
    firstName: 'J',
    lastName: 'jl',
    email: 'j@j',
    regionName: '',
    regionId: '',
    address: '',
    minWaveHt: 0,
    maxWaveHt: 5,
  });
  const [location, setLocation] = useState({
    continent: {
      name: '',
      id: '58f7ed51dadb30820bb38791'
    },
    country: {
      name: '',
      id: '58f7ed51dadb30820bb3879c'
    },
    state: {
      name: '',
      id: '58f7ed51dadb30820bb387a6'
    },
    region: {
      name: '',
      id: '58f7ed5bdadb30820bb393cd'
    }
  });
  const [subregions, setSubregions] = useState([]);

  const handleSettingsClick = e => {
    e.preventDefault();
    navigate('/settings');
  };

  const getSubregions = () => {
    const config = {
      params: {
        id: location.region.id
      }
    };
    axios.get(`${process.env.SERVER_HOST}/api/subregions_spots`, config)
      .then((res) => {
        console.log('Got the subregions', res.data);
        setSubregions(res.data);
      })
      .catch(e => console.error(e));
  };

  const handleSettings = (newLocation, newUser) => {
    console.log('New Location', newLocation);
    setLocation(newLocation);
    axios.post(`${process.env.SERVER_HOST}/db/new_user`, newUser)
      .then((res) => {
        console.log('Created new user', res.data);
        setUser(newUser);
      })
      .catch(e => console.error(e));
  };


  useEffect(() => {
    if (Object.keys(location).length > 0) {
      getSubregions();
    }
  }, [location]);

  return (
    <>
      <h1>WAAVE</h1>
      <button onClick={handleSettingsClick}>Update Settings</button>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="settings" element={<Settings handleSettings={handleSettings} user={user} currentLocation={location} />} />
        <Route path="sessions" element={<Sessions subregions={subregions} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
};

export default App;