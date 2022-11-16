import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';

const max_day_range = 16;

const SettingsForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 75%;
`;

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
    width: '200px',
    aspectRatio: '1 / 1.62',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

function addDays(date) {
  var result = new Date(date);
  result.setDate(result.getDate() + max_day_range - 1);
  return result;
}

const formatDate = (date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  return date.toISOString().split('T')[0];
}

const NewSessionModal = ({ openModal, setOpenModal, handleNewSession }) => {
  const [day, setDay] = useState('');
  const [minDay, setMinDay] = useState('');
  const [maxDay, setMaxDay] = useState('');
  const [time, setTime] = useState('am');
  const [name, setName] = useState('New Session');

  useEffect(() => {
    if (openModal) {
      let date = new Date();
      setDay(formatDate(date));
      setMinDay(formatDate(date));
      let max_date = addDays(date);
      setMaxDay(formatDate(max_date));
    }
  }, [openModal]);

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleDayChange = e => {
    e.preventDefault();
    setDay(e.target.value);
  };

  const handleTimeChange = e => {
    e.preventDefault();
    setTime(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    const newSession = {
      name,
      day,
      time
    }
    console.log('Adding session', newSession)
  }

  return (
    <Modal
      isOpen={openModal}
      ariaHideApp={false}
      style={modalStyle}
      id='new-session-modal-container'
    >
      <div id='qanda-modal-close-button'>
        <div
          onClick={(e) => {
            setOpenModal(!openModal);
          }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>

      <h3 id='qanda-modal-title' >New Session</h3>
      <SettingsForm onSubmit={handleSubmit}>
        <TextField
          type='text'
          label='Name'
          value={name}
          onChange={handleNameChange}
          required />
        <TextField
          type='date'
          label='Day'
          value={day}
          onChange={handleDayChange}
          InputProps={{ inputProps: { min: minDay, max: maxDay } }}
          required />
        <ToggleButtonGroup
          color='primary'
          value={time}
          exclusive
          onChange={handleTimeChange}
          aria-label="Time"
          required
        >
          <ToggleButton value="am">Morning</ToggleButton>
          <ToggleButton value="pm">Afternoon</ToggleButton>
        </ToggleButtonGroup>
        <Button variant='outlined' type='submit'>Add Session</Button>
      </SettingsForm>
    </Modal>
  )
}

export default NewSessionModal;