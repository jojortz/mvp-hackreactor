import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from '@mui/material';
import RatingTag from './RatingTag.jsx';

const Header = styled.div`
width: 100%;
height: fit-content;
display: flex;
align-items: center;
gap: 10px;
`

const Details = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 75%;
`;

const DetailList = styled.ul`
list-style-type: none; /* Remove bullets */
padding: 0; /* Remove padding */
margin: 0;
`
const DetailLi = styled.li`
margin: 5px 0;
`
const DetailText = styled.p`
font-size: 10pt;
padding: 0;
margin: 5px 0;
`;

const LocationInput = styled.div`
  width: 100%;
`

const modalStyle = {
  overlay: {
    position: 'fixed',
    inset: '0px',
    backgroundColor: 'rgba(234,236,233,0.4)',
  },
  content: {
    backgroundColor: 'white',
    boxShadow: '0 6px 35px rgba(0,0,0,0.65)',
    borderRadius: '25px',
    borderColor: 'rgba(255, 255, 255,0.8)',
    fontFamily: 'Roboto',
    fontWeight: '300',
    width: '300px',
    aspectRatio: '1 / 1.2',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const getTimeString = (timestamp) => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(timestamp - 24 * 60 * 60);
  return t.toString();
}

const SpotDetailModal = ({ openModal, setOpenModal, spot }) => {
  const handleClick = e => {
    e.preventDefault();
    setOpenModal(false);
  }

  return (
    <Modal
      isOpen={openModal}
      ariaHideApp={false}
      style={modalStyle}
      id='spot-detail-modal-container'
    >
      <div>
        <div
          onClick={(e) => {
            setOpenModal(!openModal);
          }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>
      <Header>
        <h3>{spot.name}</h3>
        <RatingTag rating={spot.forecast.conditions.rating} />
      </Header>
      <DetailText style={{fontStyle: 'italic'}}>Last updated {getTimeString(spot.forecast.conditions.timestamp)}</DetailText>
      <Details>
        <DetailList>
          <DetailLi>
            <h5>Day Conditions</h5>
            <DetailText>{spot.forecast.observation}</DetailText>
          </DetailLi>
          <DetailLi>
            <h5>Period Conditions</h5>
            <DetailText>{spot.forecast.conditions.observation}</DetailText>
          </DetailLi>
          <DetailLi>
            <h5>Wave Relation</h5>
            <DetailText>{spot.forecast.conditions.humanRelation}</DetailText>
          </DetailLi>
        </DetailList>
        <Button variant='outlined' onClick={handleClick}>Close</Button>
      </Details>
    </Modal>
  )
}

export default SpotDetailModal;