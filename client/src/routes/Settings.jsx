import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import axios from 'axios';

const SettingsForm = styled.form`
display: flex;
flex-direction: column;
gap: 5pt;
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
  width: 24%;
`

const maximum_wave_ht = 20;
const minimum_wave_ht = 0;

const Settings = ({ user, currentLocation, handleSettings }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState("us");
  const [address, setAddress] = useState(user.address);
  const [minWaveHt, setMinWaveHt] = useState(user.minWaveHt);
  const [maxWaveHt, setMaxWaveHt] = useState(user.maxWaveHt);
  const [regions, setRegions] = useState([]);
  const [location, setLocation] = useState(currentLocation);

  const getSubregions = (id) => {
    const config = {
      params: {
        id
      }
    };
    axios.get(`${process.env.SERVER_HOST}/api/subregions`, config)
      .then((res) => {
        setRegions(res.data);
      })
      .catch(e => console.error(e));
  };


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
      minWaveHt,
      maxWaveHt
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

  useEffect(() => {
    if (location.state.name !== '') {
      getSubregions(location.state.id);
    }
  }, [location.state]);

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: handleAddressChange,
    inputAutocompleteValue: "country",
    options: {
      types: ["address"],
      componentRestrictions: { country },
    },
  });

  const handleMinWaveChange = e => {
    e.preventDefault();
    const newWaveHeight = Number(e.target.value);
    setMinWaveHt(newWaveHeight);
    if (maxWaveHt === newWaveHeight) {
      setMaxWaveHt(newWaveHeight + 1);
    }
  };
  const handleMaxWaveChange = e => {
    e.preventDefault();
    const newWaveHeight = Number(e.target.value);
    setMaxWaveHt(newWaveHeight);
    if (minWaveHt === newWaveHeight) {
      setMinWaveHt(newWaveHeight - 1);
    }
  };

  const handleContinentChange = newContinent => {
    setLocation(location => ({
      ...location,
      continent: {
        ...location.continent,
        name: newContinent
      }
    }));
  };

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
            color="secondary"
            variant="outlined"
            inputRef={materialRef}
          />
        </div>
        <h4>Wave Height Preference [feet]</h4>
        <UserForm>
          <TextField
            sx={{ width: '70px' }}
            label='Min'
            type='number'
            value={minWaveHt}
            InputProps={{
              inputProps: {
                max: maximum_wave_ht - 1, min: minimum_wave_ht
              }
            }}
            onChange={handleMinWaveChange} />
          <TextField
            sx={{ width: '70px' }}
            label='Max'
            type='number'
            value={maxWaveHt}
            InputProps={{
              inputProps: {
                max: maximum_wave_ht, min: minimum_wave_ht + 1
              }
            }}
            onChange={handleMaxWaveChange} />
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
              <MenuItem value={'South America'}>South America</MenuItem>
              <MenuItem value={'Australia'}>Australia</MenuItem>
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
          <LocationInput>
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId="region-label"
              id="region-select"
              value={location.region.name}
              label="Region"
              onChange={e => {
                e.preventDefault();
                handleRegionChange(e.target.value);
              }}
              required
            >
              {regions.map((region, i) => (
                <MenuItem key={region.name + i}value={region.name}>{region.name}</MenuItem>
              ))}
            </Select>
          </LocationInput>
        </LocationForm>
        <Button variant='outlined' type='submit'>Update Settings</Button>
      </SettingsForm>
    </>
  )
};

export default Settings;