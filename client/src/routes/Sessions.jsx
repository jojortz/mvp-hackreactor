import React, { useEffect, useState } from 'react';
import SessionCardList from '../components/SessionCardList.jsx';

const Sessions = ({subregions}) => {
  const [sessions, setSessions] = useState([{
    name: 'Add a Session'
  }]);

  const handleNewSession = () => {
    console.log('handling new session');
  }
  return (
    <>
      <h2>Sessions</h2>
      <SessionCardList sessions={sessions} handleNewSession={handleNewSession}/>
    </>
  )
};

export default Sessions;