import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Link, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import SpotDetailModal from './SpotDetailModal.jsx';
import RatingTag from './RatingTag.jsx';


const SpotListItemContainer = styled.div`
border: 1pt solid #ddd;
border-radius: 10pt;
box-sizing: border-box;
width: 100%;
height: 100px;
padding: 20px;
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
width: 40%;
min-widt: 200px;
justify-content: flex-end;
align-items: center;
gap: 15px;
`;

const WaveHeight = styled.div`
height: 70%;
display: flex;
width: 125px;
justify-content: space-between;
align-items: center;
border-left: 1pt solid #ddd;
padding: 0 10px;
`

const SpotListItem = ({ spot }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleDetailClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  const makeNamePath = (name) => {
    let path = name.toLowerCase();
    let re = /[\s']/g;
    return path.replaceAll(re, '-');
  }

  const surfline_report_url = 'https://www.surfline.com/surf-report';

  return (
    <>
      <SpotListItemContainer>
        <DetailsContainer>
          <h4>{spot.name}</h4>
          <RatingTag rating={spot.forecast.conditions.rating} />
          <WaveHeight><h5>Waves</h5><p>{spot.forecast.conditions.minHeight + ' ft '}<FontAwesomeIcon icon={faArrowsLeftRight} />{' ' + spot.forecast.conditions.maxHeight + ' ft'}</p></WaveHeight>
        </DetailsContainer>
        <Click>
          <Link
            className='custom-link'
            underline='none'
            href={`${surfline_report_url}/${makeNamePath(spot.name)}/${spot.spotId}`} target="_blank" rel="noopener noreferrer">
            <div>
              Surfline{' '}<FontAwesomeIcon style={{ color: 'inherit' }} icon={faUpRightFromSquare} />
            </div>
          </Link>
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