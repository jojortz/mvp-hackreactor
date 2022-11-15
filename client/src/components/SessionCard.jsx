import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const SessionCardStyle = styled.div`
border: 1pt solid #666;
border-radius: 10px;
width: 200px;
height: 30vh;
display: flex;
cursor: pointer;
`;
const AddCard = styled.div`
border: 1pt solid #666;
border-radius: 10px;
width: 200px;
height: 30vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const SessionCard = ({ session, handleAddCardClick }) => {


  return (
    <>
      {session.name === 'Add a Session' ?
        <AddCard onClick={handleAddCardClick}>
          <span>{session.name}</span>
          <span>+</span>
        </AddCard>
        :
        <SessionCardStyle>
          Name: {session.name}
        </SessionCardStyle>
      }
    </>
  )
};

export default SessionCard;