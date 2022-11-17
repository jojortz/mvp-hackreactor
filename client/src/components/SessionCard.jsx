import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCalendar } from '@fortawesome/free-regular-svg-icons';



const SessionCardStyle = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`;
const Card = styled.div`
border: 1pt solid #666;
border-radius: 20px;
box-sizing: border-box;
width: 225px;
aspect-ratio: 1 / 1.5;
padding: 20px;
`

const AddCard = styled.div`
color: #666;
border-color: #eee;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
`
const DetailContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 10px 0;
`

const SessionCard = ({ session, handleAddCardClick, handleSpotsClick }) => {
  return (
    <>
      {session.type !== undefined ?
        <Card>
          <AddCard onClick={handleAddCardClick}>
            <span>{session.name}</span>
            <FontAwesomeIcon style={{marginTop: '10px', fontSize: '20px'}} icon={ faCirclePlus } />
          </AddCard>
        </Card>
        :
        <Card>
          <SessionCardStyle>
            <h4>{session.name}</h4>
            <div>
              <DetailContainer><FontAwesomeIcon icon={ faCalendar } /> <span>{session.date}</span></DetailContainer>
              <DetailContainer><FontAwesomeIcon icon={ faClock } /> <span>{session.time === 'am' ? <>Morning</> : <>Afternoon</>}</span></DetailContainer>
              <DetailContainer><FontAwesomeIcon icon={ faLocationDot } /> <span>{session.region_name}</span></DetailContainer>
            </div>
            <ButtonContainer>
              <Button onClick={e => {
                e.preventDefault();
                handleSpotsClick(session);
              }}>Spot List</Button><Button>Edit</Button>
            </ButtonContainer>
          </SessionCardStyle>
        </Card>
      }
    </>
  )
};

export default SessionCard;