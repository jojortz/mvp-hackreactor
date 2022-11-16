import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Select, InputLabel, MenuItem, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';

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
margin: 15px 0;
`

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
    aspectRatio: '1 / 1.62',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}



const SpotDetailModal = ({openModal, setOpenModal, spot}) => {
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

      <h3>{spot.name} Details</h3>
      <Details>
      <DetailList>
          <DetailLi><h5></h5>{spot.forecast.observation}</DetailLi>
          <DetailLi>Wave Relation{' ' + spot.forecast.conditions.humanRelation}</DetailLi>
      </DetailList>
        <Button variant='outlined' onClick={handleClick}>Close</Button>
      </Details>
    </Modal>
  )
}

export default SpotDetailModal;