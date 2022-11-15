import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SessionCard from './SessionCard.jsx';
import NewSessionModal from './NewSessionModal.jsx';

const SessionCardContainer = styled.div`
border: 1pt solid red;
width: 100%;
height: 90vh;
display: flex;
justify-content: flex-start;
flex-wrap: wrap;
`;

const SessionCardList = ({ sessions, handleNewSession }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleAddCardClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };
  return (
    <SessionCardContainer>
      {sessions !== undefined &&
        sessions.map((session, i) => (
          <SessionCard key={session.name + i} session={session} handleNewSession={handleNewSession} handleAddCardClick={handleAddCardClick}/>
        ))
      }
      <NewSessionModal
        handleNewSession={handleNewSession}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </SessionCardContainer >
  )
};

export default SessionCardList;