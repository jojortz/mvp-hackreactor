import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SpotListItem from './SpotListItem.jsx';

const SpotListContainer = styled.div`
width: 100%;
height: 60vh;
overflow: auto;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 3%;
`;

const rating_map = {
  POOR: 0,
  POOR_TO_FAIR: 1,
  FAIR: 2,
  FAIR_TO_GOOD: 3,
  GOOD: 4,
}

const SpotList = ({ session, user }) => {
  const [spots, setSpots] = useState([]);
  const [sort, setSort] = useState('rating');

  const getSpots = () => {
    const config = {
      params: session
    };
    axios.get(`${process.env.SERVER_HOST}/api/spots`, config)
      .then((res) => {
        console.log(res.data);
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
        console.log('newSpots', newSpots);
        setSpots(newSpots);
      })
      .catch(e => console.error(e));
  }

  useEffect(() => {
    if (session.region_id) {
      console.log('Getting spots for ', session.region_id);
      getSpots();
    }
  }, [session])
  return (
    <>
      <h3>{session.name}</h3>
      <h4>{session.date}</h4>
      <SpotListContainer>
        {spots.length > 0 ? spots.map((spot, i) => (
          <SpotListItem key={spot.name + i} spot={spot} />
        ))
      :<>{
        spots.length === 0 ?
        <p>Loading spots...</p>
        :
        <p>No spots available matching your criteria. You can modify your settings as needed.</p>
      }</>
      }
      </SpotListContainer>
    </>
  )
};

export default SpotList;