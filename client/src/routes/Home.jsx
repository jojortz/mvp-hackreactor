import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>About</h2>
      <p>WAAVE is an app that helps you plan out your surf sessions. Pick a date and time, and WAAVE will monitor the conditions to let you know the best spot to surf during that session.</p>
      <Button style={{width: '100%'}}onClick={ e => {
        e.preventDefault();
        navigate('/settings');
      }}>Let's get started!</Button>
    </>
  )
};

export default Home;