import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Home from "../routes/Home.jsx";
import Settings from "../routes/Settings.jsx";
import Sessions from "../routes/Sessions.jsx";
import ErrorPage from "../error-page.jsx";
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const host = 'http://localhost:3000';

const Header = styled.header`
box-sixing: border-box;
background: lightblue;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
margin: 0;
padding: 0 20px;
position: sticky;
top: 0;
`
const AppContainer = styled.div`
width: 80vw;
margin: 0 auto;
`

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    firstName: 'Jojo',
    lastName: 'Ortiz',
    email: 'jojo@ortiz.org',
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
  const [regions, setRegions] = useState([]);

  // const getSubregions = () => {
  //   const config = {
  //     params: {
  //       id: location.region.id
  //     }
  //   };
  //   axios.get(`${process.env.SERVER_HOST}/api/subregions_spots`, config)
  //     .then((res) => {
  //       console.log('Got the subregions', res.data);
  //       setSubregions(res.data);
  //     })
  //     .catch(e => console.error(e));
  // };
  const getRegions = (id) => {
    const config = {
      params: {
        id
      }
    };
    axios.get(`${process.env.SERVER_HOST}/api/subregions`, config)
      .then((res) => {
        setRegions(res.data);
      })
      .catch(e => console.error(e));
  };
  useEffect(() => {
    if (location.state.name !== '') {
      getRegions(location.state.id);
    }
  }, [location.state]);

  const handleSettings = (newLocation, newUser) => {
    setLocation(newLocation);
    axios.post(`${process.env.SERVER_HOST}/db/new_user`, newUser)
      .then((res) => {
        setUser(res.data);
      })
      .catch(e => console.error(e));
  };


  // useEffect(() => {
  //   if (Object.keys(location).length > 0) {
  //     getSubregions();
  //   }
  // }, [location]);

  return (
    <>
    <Header>
      <h1><FontAwesomeIcon style={{marginRight:'15px'}} icon={ faWater } />WAAVE</h1>
      <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>Home</Link> |{' '}
        <Link to="/settings" style={{ textDecoration: 'none' }}>Settings</Link> |{' '}
        <Link to="/sessions" style={{ textDecoration: 'none' }}>Sessions</Link>
      </nav>
    </Header>
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="settings" element={<Settings handleSettings={handleSettings} user={user} currentLocation={location} />} />
        <Route path="sessions/*" element={<Sessions regions={regions} user={user}/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Outlet />
    </AppContainer>

    </>
  )
};

export default App;