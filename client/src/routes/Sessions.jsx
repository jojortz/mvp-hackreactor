import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SessionCardList from '../components/SessionCardList.jsx';
import SpotList from '../components/SpotList.jsx';
import NewSessionModal from '../components/NewSessionModal.jsx';
import axios from 'axios';
const add_session_placeholder = {
  name: 'Add Session',
  type: 'new-session'
};

const Sessions = ({ regions, user }) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([add_session_placeholder]);
  const [session, setSession] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const handleAddCardClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  const handleNewSession = (newSession) => {
    setOpenModal(!openModal);
    newSession = { ...newSession, user_id: user.id, id: '' };
    axios.post(`${process.env.SERVER_HOST}/db/new_session`, newSession)
      .then((res) => {
        return getSessions();
      })
      .then((res) => {
        console.log('Got sessions', sessions);
      })
      .catch(e => console.error(e));
  }

  const handleSpotsClick = (session) => {
    setSession(session);
    navigate('spots');
  }

  const getSessions = () => {
    const config = {
      params: {
        user_id: user.id
      }
    };
    return axios.get(`${process.env.SERVER_HOST}/db/sessions`, config)
      .then((res) => {
        setSessions([...res.data, add_session_placeholder]);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    if (user.id !== '') {
      getSessions();
    }
  }, [user])
  return (
    <>
      <h2>Sessions</h2>
      <Routes>
        <Route path="/" element={<SessionCardList sessions={sessions} handleAddCardClick={handleAddCardClick} handleSpotsClick={handleSpotsClick}/>} />
        <Route path="spots" element={<SpotList session={session} user={user}/>} />
      </Routes>
      <NewSessionModal
        handleNewSession={handleNewSession}
        openModal={openModal}
        setOpenModal={setOpenModal}
        regions={regions}
      />
    </>
  )
};

export default Sessions;