import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


const Settings = ({ setLocation }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Settings</h2>
      <form onSubmit={e => {
        e.preventDefault();
        const location = {
          continent: {
            name: 'North America',
            id: '58f7ed51dadb30820bb38791'
          },
          country: {
            name: 'United States',
            id: '58f7ed51dadb30820bb3879c'
          },
          state: {
            name: 'California',
            id: '58f7ed51dadb30820bb387a6'
          },
          region: {
            name: 'Los Angeles County',
            id: '58f7ed5bdadb30820bb393cd'
          }
        };
        setLocation(location);
        navigate('/sessions');
      }}>
        <button type='submit'>Create Session</button>
      </form>
    </>
  )
};

export default Settings;