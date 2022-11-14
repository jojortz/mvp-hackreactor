import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Home</h2>
      <button onClick={ e => {
        e.preventDefault();
        navigate('/settings');
      }}>Let's get started!</button>
    </>
  )
};

export default Home;