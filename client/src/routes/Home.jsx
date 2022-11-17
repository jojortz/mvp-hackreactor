import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import styled from 'styled-components';

const ButtonContainer = styled.div`
width 100%;
display: flex;
justify-content: center;
align-items: center;
`

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
        <h2>About</h2>
        <p>WAAVE is an app that helps you plan out your surf sessions. Pick a date and time, and WAAVE will monitor the conditions to keep you updated on best spot to surf for that session.</p>
        <div></div>
        <ButtonContainer>
          <Button
            variant='outlined'
            style={{
              width: '80%',
              maxWidth: '250px',
            }}
            onClick={e => {
              e.preventDefault();
              navigate('/settings');
            }}>Let's get started!</Button>
        </ButtonContainer>
    </>
  )
};

export default Home;