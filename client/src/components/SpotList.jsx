import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SpotListItem from './SpotListItem.jsx';
import { CircularProgress, Button, TextField, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SpotListContainer = styled.div`
width: 100%;
height: 90vh;
overflow: auto;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 3%;
`;

const Loader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
`;
const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
height: 80px;
`

const rating_map = {
  POOR: 0,
  POOR_TO_FAIR: 1,
  FAIR: 2,
  FAIR_TO_GOOD: 3,
  GOOD: 4,
}

const SpotList = ({ session, user }) => {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [sort, setSort] = useState('rating');
  const [gettingSpots, setGettingSpots] = useState(false);

  const getSpots = () => {
    setGettingSpots(true);
    const config = {
      params: session
    };
    axios.get(`${process.env.SERVER_HOST}/api/spots`, config)
      .then((res) => {
        let newSpots = [];
        res.data.forEach((newSpot) => {
          if (newSpot.forecast.conditions.maxHeight <= user.maxWaveHt && newSpot.forecast.conditions.maxHeight >= user.minWaveHt) {
            newSpots.push(newSpot);
          }
        })
        if (sort === 'rating') {
          newSpots.sort((a, b) => {
            const ratingA = rating_map[a.forecast.conditions.rating];
            const ratingB = rating_map[b.forecast.conditions.rating];
            if (ratingA < ratingB) {
              return 1;
            }
            if (ratingA > ratingB) {
              return -1;
            }

            // names must be equal
            return 0;
          })
        }
        setSpots(newSpots);
        setGettingSpots(false);
      })
      .catch(e => console.error(e));
  }

  const handleGoToSettings = (e) => {
    e.preventDefault();
    navigate('/settings');
  }

  useEffect(() => {
    if (session.region_id) {
      getSpots();
    }
  }, [session])
  return (
    <>
      {spots.length > 0 &&
        <Header>
          <div>
            <h3>{session.name}</h3>
            <h4>{session.date}</h4>
          </div>
          <div>
            <TextField
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              select
              label="SORT"
            >
              <MenuItem value='rating'>Rating</MenuItem>
              <MenuItem value='wave-height'>Wave Height</MenuItem>
            </TextField>
          </div>
        </Header>
      }
      <SpotListContainer>
        {spots.length > 0 ? spots.map((spot, i) => (
          <SpotListItem key={spot.name + i} spot={spot} />
        ))
          :
          <>
            {
              gettingSpots ?
                <Loader>
                  Loading spots
                  <CircularProgress />
                </Loader>
                :
                <>
                  <p>No spots available matching your criteria. Please modify your settings.</p>
                  <Button variant='outlined' onClick={handleGoToSettings}>Go to settings</Button>
                </>
            }
          </>
        }
      </SpotListContainer>
    </>
  )
};

export default SpotList;