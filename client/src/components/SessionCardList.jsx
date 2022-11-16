import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SessionCard from './SessionCard.jsx';

const SessionCardContainer = styled.div`
width: 100%;
height: 90vh;
display: flex;
flex-flow: row wrap;
justify-content: flex-start;
align-items: flex-start;
gap: 3%;
overflow: auto;
`;

const SessionCardList = ({ sessions, handleAddCardClick, handleSpotsClick }) => {
  return (
    <SessionCardContainer>
      {sessions !== undefined &&
        sessions.map((session, i) => (
          <SessionCard key={session.name + i} session={session} handleAddCardClick={handleAddCardClick} handleSpotsClick={handleSpotsClick}/>
        ))
      }
    </SessionCardContainer >
  )
};

export default SessionCardList;