import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Link } from '@mui/material';
import SpotDetailModal from './SpotDetailModal.jsx';


const SpotListItemContainer = styled.div`
border: 1pt solid #ddd;
border-radius: 10pt;
box-sizing: border-box;
width: 100%;
height: 100px;
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
`;
const DetailsContainer = styled.div`
width: 90%;
display: flex;
justify-content: flex-start;
align-items: center;
gap: 15px;
`;

const Click = styled.div`
display: flex;
width: 30%;
justify-content: flex-end;
align-items: center;
gap: 15px;
`;

const SpotListItem = ({ spot }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleDetailClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    console.log('Spot details', spot);
  };

  const makeNamePath = (name) => {
    let path = name.toLowerCase();
    let re = /[\s']/;
    return path.replace(re, '-');
  }

  const surfline_report_url = 'https://www.surfline.com/surf-report';

  return (
    <>
      <SpotListItemContainer>
        <DetailsContainer>
          <h4>{spot.name}</h4>
          <span>{spot.forecast.conditions.rating}</span>
          <span>Max: {spot.forecast.conditions.maxHeight}</span>
          <span>Min: {spot.forecast.conditions.minHeight}</span>
        </DetailsContainer>
        <Click>
          <Link underline='none' href={`${surfline_report_url}/${makeNamePath(spot.name)}/${spot.spotId}`} target="_blank" rel="noopener noreferrer">Surfline</Link>
          <Button variant='outlined' onClick={handleDetailClick}>Details</Button>
        </Click>
      </SpotListItemContainer>
      <SpotDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        spot={spot}
      />
    </>
  )
};

export default SpotListItem;