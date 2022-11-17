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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../MuiTheme';

const Header = styled.header`
box-sixing: border-box;
background: #48cae4;
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
box-sizing: border-box;
max-width: 1200px;
min-width: 600px;
margin: 0 auto;
`

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
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

  return (
    <>
      <ThemeProvider theme={theme}>

        <Header>
          <h1><Link to="/" style={{ textDecoration: 'none' }}><FontAwesomeIcon style={{ marginRight: '15px', color: 'white' }} icon={faWater} />WAAVE</Link></h1>
          <nav>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link> |{' '}
            <Link to="/settings" style={{ textDecoration: 'none' }}>Settings</Link> |{' '}
            <Link to="/sessions" style={{ textDecoration: 'none' }}>Sessions</Link>
          </nav>
        </Header>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="settings" element={<Settings handleSettings={handleSettings} user={user} currentLocation={location} />} />
            <Route path="sessions/*" element={<Sessions regions={regions} user={user} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Outlet />
        </AppContainer>
      </ThemeProvider>

    </>
  )
};

export default App;