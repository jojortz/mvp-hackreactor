import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { Select, InputLabel, MenuItem, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

const max_day_range = 17;

const SettingsForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 80%;
margin-top: 20px;
`;

const LocationInput = styled.div`
  width: 100%;
`


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

const NewSessionModal = ({ openModal, setOpenModal, handleNewSession, regions }) => {
  const navigate = useNavigate();
  const [day, setDay] = useState('');
  const [minDay, setMinDay] = useState('');
  const [maxDay, setMaxDay] = useState('');
  const [time, setTime] = useState('am');
  const [name, setName] = useState('New Session');
  const [region, setRegion] = useState({
    name: '',
    id: ''
  });

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
      width: '275px',
      aspectRatio: `${regions.length > 0 ? '1 / 1.62' : '1 / 0.6'}`,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }

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
  const handleRegionChange = newRegion => {
    regions.every((thisRegion) => {
      if (thisRegion.name === newRegion) {
        setRegion(thisRegion);
        return false;
      }
      return true;
    })
  };

  const handleTimeChange = e => {
    e.preventDefault();
    setTime(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleNewSession({
      name,
      day,
      time,
      regionId: region.id,
      regionName: region.name
    });
  }
  const handleGoToSettings = (e) => {
    e.preventDefault();
    navigate('/settings');
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
      {regions.length > 0
        ?
        <>
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
            <LocationInput>

              <InputLabel id="region-label">Region</InputLabel>
              <Select
                sx={{ width: '100%' }}
                labelId="region-label"
                id="region-select"
                value={region.name}
                label="Region"
                onChange={e => {
                  e.preventDefault();
                  handleRegionChange(e.target.value);
                }}
                required
              >
                {regions.map((region, i) => (
                  <MenuItem key={region.name + i} value={region.name}>{region.name}</MenuItem>
                ))}
              </Select>
            </LocationInput>
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
        </>
        :
        <div>
          <h3>Uh oh{' '}<FontAwesomeIcon icon={faFaceSadTear} /></h3>
          <SettingsForm>
            <p>Looks like you don't have your location set. Please update your settings.</p>
            <Button variant='outlined' onClick={handleGoToSettings}>Go to settings</Button>
          </SettingsForm>
        </div>}
    </Modal>
  )
}

export default NewSessionModal;