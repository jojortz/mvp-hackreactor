import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { TextField, Select, MenuItem, InputLabel, Button, Slider } from '@mui/material';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import axios from 'axios';

const SettingsForm = styled.form`
display: flex;
flex-direction: column;
gap: 5pt;
max-width: 1000px;
padding-bottom: 20px;
`;

const UserForm = styled.div`
display: flex;
gap: 10pt;
padding-bottom: 10px;
`;
const LocationForm = styled.div`
display: flex;
justify-content: flex-start;
gap: 2%;
padding-bottom: 10px;
`;

const LocationInput = styled.div`
  width: 32%;
`

const maximum_wave_ht = 20;
const minimum_wave_ht = 0;

const marks = [
  {
    value: minimum_wave_ht,
    label: `${minimum_wave_ht}ft`,
  },
  {
    value: maximum_wave_ht,
    label: `${maximum_wave_ht}ft`,
  }
];

const Settings = ({ user, currentLocation, handleSettings }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState("us");
  const [address, setAddress] = useState(user.address);
  const [location, setLocation] = useState(currentLocation);
  const [tempAddress, setTempAddress] = useState(user.address);
  const [waveHts, setWaveHts] = useState([user.minWaveHt, user.maxWaveHt]);


  const handleSubmit = e => {
    e.preventDefault();
    const thisUser = {
      id: user.id,
      firstName,
      lastName,
      email,
      regionName: location.region.name,
      regionId: location.region.id,
      address,
      minWaveHt: waveHts[0],
      maxWaveHt: waveHts[1]
    }
    handleSettings(location, thisUser);
    navigate('/sessions');
  };

  const handleAddressChange = (place) => {
    place.address_components.forEach((component) => {
      if (component.types.includes('country')) {
        handleCountryChange(component.long_name);
        handleContinentChange('North America');
      } else if (component.types.includes('administrative_area_level_1')) {
        handleStateChange(component.long_name);
      }
    });
    setAddress(place.formatted_address);
  };
  const handleTempAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  }

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: handleAddressChange,
    inputAutocompleteValue: "country",
    options: {
      types: ["address"],
      componentRestrictions: { country },
    },
  });

  const handleContinentChange = newContinent => {
    setLocation(location => ({
      ...location,
      continent: {
        ...location.continent,
        name: newContinent
      }
    }));
  };
  const handleWaveChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const minDistance = 1;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setWaveHts([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setWaveHts([clamped - minDistance, clamped]);
      }
    } else {
      setWaveHts(newValue);
    }
  }

  const handleCountryChange = newCountry => {
    setLocation(location => ({
      ...location,
      country: {
        ...location.country,
        name: newCountry
      }
    }))
  };

  const handleStateChange = newState => {
    setLocation(location => ({
      ...location,
      state: {
        ...location.state,
        name: newState
      }
    }))
  };

  const handleRegionChange = newRegion => {
    regions.forEach((thisRegion) => {
      if (thisRegion.name === newRegion) {
        setLocation(location => ({
          ...location,
          region: thisRegion
        }))
      }
    })
  };

  function valuetext(value) {
    return `${value}ft`;
  }

  return (
    <>
      <h2>Settings</h2>
      <SettingsForm onSubmit={handleSubmit}>
        <h3>User</h3>
        <UserForm>
          <TextField label="First Name" value={firstName} required onChange={e => {
            e.preventDefault();
            setFirstName(e.target.value);
          }} />
          <TextField type='text' label="Last Name" value={lastName} required onChange={e => {
            e.preventDefault();
            setLastName(e.target.value);
          }} />
          <TextField label="email" type='email' value={email} required onChange={e => {
            e.preventDefault();
            setEmail(e.target.value);
          }} />
        </UserForm>
        <div>
          <TextField
            required
            label='Address'
            fullWidth
            value={address}
            color="secondary"
            variant="outlined"
            inputRef={materialRef}
            onChange={handleTempAddressChange}
          />
        </div>
        <h4>Wave Height Preference</h4>
        <UserForm>
          <Slider
          style={{marginTop: '30px'}}
            getAriaLabel={() => 'Wave Height'}
            value={waveHts}
            onChange={handleWaveChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            marks={marks}
            min={minimum_wave_ht}
            max={maximum_wave_ht}
            disableSwap
          />
        </UserForm>
        <h3>Surf Region</h3>
        <LocationForm>
          <LocationInput>
            <InputLabel id="continent-label">Continent</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId="continent-label"
              id="continent-select"
              value={location.continent.name}
              label="Continent"
              onChange={e => {
                e.preventDefault();
                handleContinentChange(e.target.value);
              }}
              required
            >
              <MenuItem disabled value={''}>Select a continent.</MenuItem>
              <MenuItem value={'North America'}>North America</MenuItem>
            </Select>
          </LocationInput>
          <LocationInput>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId="country-label"
              id="country-select"
              value={location.country.name}
              label="Country"
              onChange={e => {
                e.preventDefault();
                handleCountryChange(e.target.value);
              }}
              required
            >
              <MenuItem value={'United States'}>United States</MenuItem>
              <MenuItem value={'Canada'}>Canada</MenuItem>
              <MenuItem value={'Mexico'}>Mexico</MenuItem>
            </Select>
          </LocationInput>
          <LocationInput>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId="state-label"
              id="state-select"
              value={location.state.name}
              label="State"
              onChange={e => {
                e.preventDefault();
                handleStateChange(e.target.value);
              }}
              required
            >
              <MenuItem value={'California'}>California</MenuItem>
            </Select>
          </LocationInput>
        </LocationForm>
        <Button variant='outlined' type='submit'>Update Settings</Button>
      </SettingsForm>
    </>
  )
};

export default Settings;